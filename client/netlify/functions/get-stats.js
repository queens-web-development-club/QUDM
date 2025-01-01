const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  console.log('Lambda environment:', {
    lambda_task_root: process.env.LAMBDA_TASK_ROOT,
    pwd: process.cwd(),
    dirname: __dirname,
    filename: __filename
  });

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  if (event.httpMethod !== 'GET') {
    return { 
      statusCode: 405, 
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: 'Method Not Allowed' 
    };
  }

  try {
    // Try multiple possible paths for data.json
    const possiblePaths = [
      path.join(__dirname, 'data.json'),
      path.join(process.cwd(), 'data.json'),
      path.join(process.env.LAMBDA_TASK_ROOT || '', 'data.json'),
      './data.json'
    ];

    let rawData;
    let usedPath;

    // Try each path until we find the file
    for (const dataPath of possiblePaths) {
      try {
        console.log('Attempting to read from:', dataPath);
        rawData = await fs.readFile(dataPath, 'utf8');
        usedPath = dataPath;
        break;
      } catch (err) {
        console.log(`Failed to read from ${dataPath}:`, err.message);
        continue;
      }
    }

    if (!rawData) {
      throw new Error('Could not find data.json in any of the expected locations');
    }

    const jsonData = JSON.parse(rawData);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(jsonData.statistics)
    };
  } catch (error) {
    console.error('Get stats error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Internal Server Error', 
        details: error.message,
        environment: {
          lambda_task_root: process.env.LAMBDA_TASK_ROOT,
          pwd: process.cwd(),
          dirname: __dirname,
          filename: __filename
        }
      })
    };
  }
};