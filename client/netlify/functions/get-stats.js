const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {

  console.log({
    filename: __filename,
    dirname: __dirname,
    functionDir: path.dirname(__filename),
    attemptedDataPath: path.join(path.dirname(__filename), 'data.json')
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
    // Update path to look in the same directory as the function
    const functionDir = path.dirname(__filename);
    const dataPath = path.join(functionDir, 'data.json');
    console.log('Attempting to read from:', dataPath);
    
    const rawData = await fs.readFile(dataPath, 'utf8');
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
        functionDir: path.dirname(__filename),
        attemptedPath: path.join(path.dirname(__filename), 'data.json')
      })
    };
  }
};