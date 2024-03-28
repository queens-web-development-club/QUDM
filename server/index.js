const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Endpoint to send email
app.post("/api/contact/get", (req, res) => {
    console.log("recieved")
    const { name, email, message } = req.body;
    console.log(name, email, message);

    // Add code to send email here

    res.status(200).send('Email sent successfully');
});

// RUN server on port (put at end)
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
