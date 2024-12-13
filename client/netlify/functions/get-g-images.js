const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    // Assuming the images are stored in 'public/images/gallery'
    const imagesDir = path.resolve(__dirname, '../../public/images/gallery');
    
    // Check if the directory exists
    await fs.access(imagesDir);
    
    // Read the files in the directory
    const files = await fs.readdir(imagesDir);
    
    // Filter out non-image files (optional)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    // Map image files to full paths
    const imagePaths = imageFiles.map(file => `/images/gallery/${file}`);

    return {
      statusCode: 200,
      body: JSON.stringify(imagePaths),
    };
  } catch (error) {
    console.error('Error reading images directory:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch images' }),
    };
  }
};
