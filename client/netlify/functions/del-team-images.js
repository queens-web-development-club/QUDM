const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {  // Change this line to allow GET requests
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    // Logic for getting stats (instead of deleting an image)
    const stats = await fs.readdir(path.resolve(__dirname, '../../public/images/team/'));

    return {
      statusCode: 200,
      body: JSON.stringify({ stats }),
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch stats' }),
    };
  }
};
