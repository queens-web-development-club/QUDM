const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  console.log('Environment:', {
    lambda_task_root: process.env.LAMBDA_TASK_ROOT,
    pwd: process.cwd(),
    dirname: __dirname,
    filename: __filename
  });

  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Email and password are required' })
      };
    }

    // Try multiple possible paths for data.json
    const possiblePaths = [
      path.join(__dirname, 'data.json'),
      path.join(process.cwd(), 'data.json'),
      path.join(process.env.LAMBDA_TASK_ROOT || '', 'data.json'),
      './data.json'
    ];

    let jsonData;
    let usedPath;

    for (const dataPath of possiblePaths) {
      try {
        console.log('Attempting to read from:', dataPath);
        const data = await fs.readFile(dataPath, 'utf8');
        jsonData = JSON.parse(data);
        usedPath = dataPath;
        console.log('Successfully read from:', dataPath);
        break;
      } catch (err) {
        console.log(`Failed to read from ${dataPath}:`, err.message);
        continue;
      }
    }

    if (!jsonData) {
      throw new Error('Could not find data.json in any of the expected locations');
    }

    const isValidCredentials = await bcrypt.compare(
      password, 
      jsonData.auth.passwordHash
    );

    if (email === jsonData.auth.email && isValidCredentials) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Login successful' })
      };
    } else {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Invalid credentials' })
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        message: 'Internal Server Error',
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