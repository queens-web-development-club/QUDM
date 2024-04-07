//To run sever, cd into server directory and type: npm start
//any time you make a change, nodemon will restart the server automatically. Typically you would have to restart each time.

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


//chris test
const path = require('path');

// Endpoint to send email
app.post("/api/contact/get", (req, res) => {
    console.log("recieved")
    const { name, email, message } = req.body;
    console.log(name, email, message);

    // Add code to send email here

    res.status(200).send('Email sent successfully');
});

//Endpoint to check auth
app.post('/api/login/post', (req, res) => {
    console.log("recieved")
    const { email, password } = req.body;

    fs.readFile('./database/data.json', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        const jsonData = JSON.parse(data);

        if (email === jsonData.auth.email && password === jsonData.auth.password) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    })
});

//Endpoint to get stat data
app.get('/api/stats/get', (req, res) => {

    fs.readFile('./database/data.json', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        const jsonData = JSON.parse(data);
        const statistics = jsonData.statistics;
        res.status(200).json(statistics);
    })
});

//Endpoint to update stat data
app.put('/api/stats/put/:id', async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    // Read the data from the JSON file
    fs.readFile('./database/data.json', 'utf8', (err, jsonData) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            const parsedData = JSON.parse(jsonData);

            // Check if the statistic exists
            if (parsedData.statistics && parsedData.statistics[id] !== undefined) {
                // Update the statistic with the new value
                parsedData.statistics[id] = data;

                // Write the updated data back to the file
                fs.writeFile('./database/data.json', JSON.stringify(parsedData, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                    
                    res.status(200).send('Statistic updated successfully');
                });
            } else {
                res.status(404).send('Statistic not found');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Endpoint to fetch ALL image info  filename : path
app.get('/api/images/get', (req, res) => {
    const imageDir = 'database/galleryImages';

    fs.readdir(imageDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Filter out non-image files
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        // Array to store image information
        const images = [];

        // Iterate over image files
        imageFiles.forEach(file => {
            const filePath = path.join(imageDir, file);

            // Get file stats to retrieve creation date
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                // Push image info with filename and creation date
                images.push({
                    filename: file,
                    dateOfCreation: stats.birthtime // Get creation date
                });

                // If all files processed, send JSON response
                if (images.length === imageFiles.length) {
                    res.json(images);
                }
            });
        });
    });
});
// Endpoint to fetch a specific image by filename
app.get('/api/images/:folder/:filename', (req, res) => {
    const baseDir = path.join(__dirname, 'database'); // Base directory where all image folders are stored
    const folder = req.params.folder;
    const filename = req.params.filename;

    // Construct the full path to the image file
    const imagePath = path.join(baseDir, folder, filename);

    // Check if the file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error accessing file:', err);
            return res.status(404).json({ error: 'Image not found' });
        }

        // If the file exists, send it as a response with appropriate content type
        res.sendFile(imagePath);
    });
});

app.delete('/api/images/:filename', (req, res) => {
    const imageDir = path.join(__dirname, 'database', 'galleryImages'); // Construct absolute path to image directory
    const filename = req.params.filename;

    // Construct the full path to the image file
    const imagePath = path.join(imageDir, filename);

    // Check if the file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error accessing file:', err);
            return res.status(404).json({ error: 'Image not found' });
        }

        // If the file exists, delete it
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            
            console.log('Image deleted successfully');
            res.status(200).json({ message: 'Image deleted successfully' });
        });
    });
});

// Get users
app.get('/api/users/get', (req, res) => {

    fs.readFile('./database/data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        try {
            const jsonData = JSON.parse(data);
            console.log(jsonData)
            const authData = {
                email: jsonData.auth.email,
                password: jsonData.auth.password
            };
            res.json(authData);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })
  });

// RUN server on port (put at end)
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
