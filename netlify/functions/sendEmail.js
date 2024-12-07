const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { name, email, message, contactInfo } = JSON.parse(event.body);
    const senderEmail = 'tinberg92@hotmail.com';

    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // use STARTTLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    

    const mailOptions = {
        from: senderEmail,
        to: senderEmail, 
        subject: `Message from ${name}`,
        text: `message: ${message}\nEmail from: ${email}` 
        
    };

    try {
        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: "Email sent!" };
    } catch (error) {
        return { statusCode: 500, body: "Error sending email: " + error.message };
    }
};

