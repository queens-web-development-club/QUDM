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
    // Set the path for the team images
    const imagesDir = path.resolve(__dirname, '../../public/images/team');
    
    // Read the filenames from the team images directory
    const files = await fs.readdir(imagesDir);
    
    // Filter out any non-image files (in case there are other files in the directory)
    const imageFiles = files.filter(file => file.endsWith('.jpg'));

    // Map the filenames into an array of objects with title and name
    const teamData = imageFiles.map(file => {
      const [title, name] = file.replace('.jpg', '').split('_');
      return {
        title: title.replace(/_/g, ' '), // Replace underscores back to spaces for title
        name: name.replace(/_/g, ' '), // Replace underscores back to spaces for name
        imageUrl: `/images/team/${file}`,
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(teamData),
    };
  } catch (error) {
    console.error('Error fetching team:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch team data' }),
    };
  }
};
