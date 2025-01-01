const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  console.log('Environment:', {
    lambda_task_root: process.env.LAMBDA_TASK_ROOT,
    pwd: process.cwd(),
    dirname: __dirname,
    filename: __filename
  });

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: 'Method Not Allowed',
    };
  }

  try {
    // Try multiple possible paths for the team directory
    const possiblePaths = [
      path.join(__dirname, '../public/images/team'),
      path.join(process.cwd(), 'public/images/team'),
      path.join(process.env.LAMBDA_TASK_ROOT || '', 'public/images/team'),
      './public/images/team'
    ];

    let files;
    let usedPath;

    // Try each path until we find the directory
    for (const dirPath of possiblePaths) {
      try {
        console.log('Attempting to read from:', dirPath);
        files = await fs.readdir(dirPath);
        usedPath = dirPath;
        console.log('Successfully read from:', dirPath);
        break;
      } catch (err) {
        console.log(`Failed to read from ${dirPath}:`, err.message);
        continue;
      }
    }

    if (!files) {
      throw new Error('Could not find team directory in any of the expected locations');
    }

    // Filter for image files and create team data
    const imageFiles = files.filter(file => 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') || 
      file.toLowerCase().endsWith('.png')
    );

    const teamData = imageFiles.map(file => {
      // Remove file extension
      const nameWithoutExt = file.replace(/\.[^/.]+$/, "");
      // Split by underscore if present, otherwise use the whole name
      const [title, name] = nameWithoutExt.includes('_') ? 
        nameWithoutExt.split('_') : 
        [nameWithoutExt, ''];

      return {
        title: title.replace(/_/g, ' '),
        name: name.replace(/_/g, ' '),
        imageUrl: `/images/team/${file}`
      };
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(teamData)
    };

  } catch (error) {
    console.error('Error fetching team:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch team data',
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