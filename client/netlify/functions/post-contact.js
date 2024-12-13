const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    const { name, email, message } = JSON.parse(event.body);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'owensawler4@gmail.com', // Your email
        pass: 'dhdt ftot llnj knkt'   // Your email password or app-specific password
      }
    });

    // Define email content
    const mailOptions = {
      from: `${email}`,
      to: 'owensawler4@gmail.com', // Your email
      subject: 'New Message from Contact Form',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent successfully' }),
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error sending email' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method Not Allowed' }),
  };
};
