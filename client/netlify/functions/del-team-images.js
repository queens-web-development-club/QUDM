const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { filename } = JSON.parse(event.body);

    if (!filename) {
      return {
        statusCode: 400,
        body: 'No filename provided',
      };
    }

    // Remove the "/images/team/" part from the filename to get the correct file path
    const fileNameWithoutPath = filename.replace('/images/team/', '');
    const imagePath = path.resolve(__dirname, `../../public/images/team/${fileNameWithoutPath}`);

    // Check if the file exists
    await fs.access(imagePath);

    // Delete the file
    await fs.unlink(imagePath);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Successfully deleted ${filename}` }),
    };
  } catch (error) {
    console.error('Error deleting image:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to delete image' }),
    };
  }
};
