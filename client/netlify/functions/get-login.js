const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the incoming request body
    const { email, password } = JSON.parse(event.body);

    // Validate input
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email and password are required' })
      };
    }

    // Read the data file
    const dataPath = path.join(__dirname, '../functions/database/data.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const jsonData = JSON.parse(data);

    // First, hash the incoming password to compare with stored hash
    const isValidCredentials = await bcrypt.compare(
      password, 
      jsonData.auth.passwordHash
    );

    // Check if credentials are valid
    if (email === jsonData.auth.email && isValidCredentials) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Login successful' })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid credentials' })
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};

// Utility function to hash password (use this when initially setting up or changing password)
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}