// require('dotenv').config({path: './cred.env'});
// const express = require('express');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Nodemailer configuration
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// app.post('/api/contact', (req, res) => {
//   const { name, email, subject, message } = req.body;

//   const mailOptions = {
//     // from: email,
//     to: 'services.tishagaur@gmail.com',
//     subject: subject,
//     text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       return res.status(500).send(error.toString());
//     }
//     res.status(200).send('Message sent successfully!');
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config({path: './cred.env'});
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173/resumelink'
}));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    to: 'services.tishagaur@gmail.com',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Message sent successfully!');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
