// const nodemailer = require("nodemailer");

// exports.handler = async function (event, context) {
//   if (event.httpMethod !== "POST") {
//     return { statusCode: 405, body: "Method Not Allowed" };
//   }

//   const { name, email, message, contactInfo } = JSON.parse(event.body);
//   const senderEmail = "tinberg92@hotmail.com";

//   const transporter = nodemailer.createTransport({
//     service: "hotmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: senderEmail,
//     to: senderEmail,
//     subject: `Message from ${name}`,
//     text: `message: ${message}\nEmail from: ${email}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return { statusCode: 200, body: "Email sent!" };
//   } catch (error) {
//     return { statusCode: 500, body: "Error sending email: " + error.message };
//   }
// };


const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, message, contactInfo } = JSON.parse(event.body);
  const senderEmail = 'tinberg92@hotmail.com';

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Use the correct SMTP server
    port: 587, // Port for TLS
    secure: false, // Upgrade later with STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  const mailOptions = {
    from: senderEmail,
    to: senderEmail,
    subject: `Message from ${name}`,
    text: `Message: ${message}\nEmail from: ${email}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);
    return { statusCode: 200, body: 'Email sent!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: `Error sending email: ${error.message}`,
    };
  }
};
