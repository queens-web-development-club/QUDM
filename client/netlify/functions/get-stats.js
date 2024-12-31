// netlify/functions/get-stats/get-stats.js
const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
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
    // Data file is now in the same directory as the function
    const dataPath = path.join(__dirname, 'data.json');
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
        path: __dirname
      })
    };
  }
};