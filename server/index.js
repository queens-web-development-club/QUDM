//To run sever, cd into server directory and type: npm start
//any time you make a change, nodemon will restart the server automatically. Typically you would have to restart each time.

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


//chris test
const path = require('path');

// Endpoint to send email
app.post("/api/contact/post", async (req, res) => {
    console.log("recieved")
    const { name, email, message } = req.body;
    console.log(name, email, message);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'owensawler4@gmail.com',
            pass: 'dhdt ftot llnj knkt' //please dont spam me rn
        }
    });

    // Define email content
    const mailOptions = {
        from: `${email}`,
        to: 'owensawler4@gmail.com',
        subject: 'New Message from Contact Form',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).send('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      }

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

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'database', 'galleryImages');
        
        // Ensure the upload directory exists
        fs.exists(uploadDir, (exists) => {
            if (!exists) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            cb(null, uploadDir);
        });
    },
    filename: (req, file, cb) => {
        // You can customize the filename here
        cb(null, file.originalname); // Keep original file name
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

app.post('/api/images/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Image uploaded successfully:', req.file.filename);
    res.status(200).json({ message: 'Image uploaded successfully', filename: req.file.filename });
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

//Edit user password
app.put('/api/user/put/:email', (req, res) => {
    fs.readFile('./database/data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        try {
            const jsonData = JSON.parse(data);
            console.log(jsonData);
    
            // Extract email and password from request body
            const { email, password } = req.body;
    
            // Update email's password if email matches
            if (jsonData.auth.email === email) {
                jsonData.auth.password = password;
            }
    
            // Update statistics if necessary
            // For example, let's say you want to update stat1 to a new value
            // Replace 'newStatValue' with the new value you want to set for stat1
            jsonData.statistics.stat1 = newStatValue;
    
            // Now, write the modified JSON back to the file
            fs.writeFile('./database/data.json', JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                res.json({ message: 'Data updated successfully' });
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
})
    

    

// RUN server on port (put at end)
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
