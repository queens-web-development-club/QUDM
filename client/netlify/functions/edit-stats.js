const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  // Only allow PUT requests for editing stats
  if (event.httpMethod !== 'PUT') {
    return { 
      statusCode: 405, 
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: 'Method Not Allowed' 
    };
  }

  try {
    // Parse the request body
    const { selectedStatId, data } = JSON.parse(event.body);

    // Ensure selectedStatId and data are provided
    if (!selectedStatId || !data) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Selected Stat ID and data are required.' })
      };
    }

    // Correct path to 'data.json' based on your folder structure
    const dataPath = path.resolve(__dirname, 'database/data.json');
    console.log('Data path:', dataPath); // Log the resolved path for debugging
    
    // Read the current data from the JSON file
    const rawData = await fs.readFile(dataPath, 'utf8');
    const jsonData = JSON.parse(rawData);
    
    // Check if the stat exists in the statistics object (stat1, stat2, etc.)
    if (!(selectedStatId in jsonData.statistics)) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Stat not found' }),
      };
    }

    // Update the stat data
    jsonData.statistics[selectedStatId] = data;

    // Write the updated stats back to the JSON file
    await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), 'utf8');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Stat updated successfully' }),
    };
  } catch (error) {
    console.error('Error updating stat:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
