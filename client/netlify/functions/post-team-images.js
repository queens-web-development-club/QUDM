const fs = require('fs').promises;
const path = require('path');
const mime = require('mime-types');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { title, name, image } = JSON.parse(event.body);

    if (!image || !title || !name) {
      return {
        statusCode: 400,
        body: 'Title, Name, or Image missing',
      };
    }

    // Decode the base64 image
    const buffer = Buffer.from(image, 'base64');
    
    // Create the filename using title and name (replace invalid file characters)
    const fileName = `${title.replace(/[^a-zA-Z0-9\s]/g, '_')}_${name.replace(/[^a-zA-Z0-9\s]/g, '_')}.jpg`;
    
    // Set the path for the team images
    const imagesDir = path.resolve(__dirname, '../../public/images/team');
    
    // Ensure the directory exists
    await fs.mkdir(imagesDir, { recursive: true });
    
    // Write the image to the folder
    await fs.writeFile(path.join(imagesDir, fileName), buffer);
    
    const imageUrl = `/images/team/${fileName}`;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Image uploaded successfully', imageUrl }),
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to upload image' }),
    };
  }
};
