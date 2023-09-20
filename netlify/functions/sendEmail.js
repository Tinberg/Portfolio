const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    console.log('Function started...');
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { name, email, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: 'hotmail', // For example, if you're using Gmail. Otherwise, adjust accordingly.
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: 'tinberg92@hotmail.com', // Your email where you want to receive the messages.
        subject: `Message from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: "Email sent!" };
    } catch (error) {
        return { statusCode: 500, body: "Error sending email: " + error.message };
    }
};