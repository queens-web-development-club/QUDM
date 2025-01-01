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
    // Try multiple possible paths for the gallery directory
    const possiblePaths = [
      path.join(__dirname, 'public/images/gallery'),
      path.join(process.cwd(), 'public/images/gallery'),
      path.join(process.env.LAMBDA_TASK_ROOT || '', 'public/images/gallery'),
      './public/images/gallery'
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
      throw new Error('Could not find gallery directory in any of the expected locations');
    }

    // Filter for image files
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    // Map to public URLs
    const imagePaths = imageFiles.map(file => `/images/gallery/${file}`);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(imagePaths)
    };
  } catch (error) {
    console.error('Error reading images directory:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch images',
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