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
    const { image } = JSON.parse(event.body);
    
    if (!image) {
      return {
        statusCode: 400,
        body: 'No image provided',
      };
    }

    // Decode base64 image
    const buffer = Buffer.from(image.split(',')[1], 'base64');
    
    // Generate a unique filename based on timestamp and random number
    const timestamp = Date.now();
    const fileName = `image_${timestamp}.png`; // You can change the extension based on mime type
    
    const imagesDir = path.resolve(__dirname, '../../public/images/gallery');
    
    // Ensure the directory exists
    await fs.mkdir(imagesDir, { recursive: true });
    
    // Write the image to the directory
    await fs.writeFile(path.join(imagesDir, fileName), buffer);
    
    const imageUrl = `/images/gallery/${fileName}`;
    
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
