const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    console.log('Function triggered');

    if (event.httpMethod !== "POST") {
        console.log('Method Not Allowed');
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { name, email, message, contactInfo } = JSON.parse(event.body);
    console.log(`Received message from: ${name}, email: ${email}`);

    const senderEmail = 'tinberg92@hotmail.com';

    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // use STARTTLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: senderEmail,
        to: senderEmail,
        subject: `Message from ${name}`,
        text: `Message: ${message}\nEmail from: ${email}`
    };

    try {
        console.log('Sending email...');
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        return { statusCode: 200, body: "Email sent!" };
    } catch (error) {
        console.error('Error sending email:', error);
        return { statusCode: 500, body: "Error sending email: " + error.message };
    }
};
