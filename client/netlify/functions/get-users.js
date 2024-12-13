const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

// Get Users Function
exports.handler = async (event, context) => {
  // Handle different HTTP methods
  switch (event.httpMethod) {
    case 'GET':
      return getUsers(event);
    case 'PUT':
      return updateUser(event);
    default:
      return { 
        statusCode: 405, 
        body: JSON.stringify({ message: 'Method Not Allowed' }) 
      };
  }
};

// Function to get users
async function getUsers(event) {
  try {
    const dataPath = path.join(__dirname, '../functions/database/data.json');
    const rawData = await fs.readFile(dataPath, 'utf8');
    const jsonData = JSON.parse(rawData);

    // Only return non-sensitive user info
    const userData = {
      email: jsonData.auth.email
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(userData)
    };
  } catch (error) {
    console.error('Get users error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
}

// Function to update user (password)
async function updateUser(event) {
  try {
    // Parse request body
    const { email, password } = JSON.parse(event.body);

    // Validate input
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and password are required' })
      };
    }

    const dataPath = path.join(__dirname, '../functions/database/data.json');
    const rawData = await fs.readFile(dataPath, 'utf8');
    const jsonData = JSON.parse(rawData);

    // Verify email matches
    if (jsonData.auth.email !== email) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    // Hash the new password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Update password hash
    jsonData.auth.passwordHash = passwordHash;

    // Write back to file
    await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'User updated successfully' })
    };
  } catch (error) {
    console.error('Update user error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
}