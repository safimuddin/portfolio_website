const nodemailer = require("nodemailer");

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
});

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { firstName, lastName, email, message, phone } = JSON.parse(event.body);

        const name = firstName + " " + lastName;
        
        const mail = {
            from: name,
            to: process.env.RECIPIENT_EMAIL,
            subject: "Form Submission - Website",
            html: `<p>Name: ${name}</p>
                   <p>Email: ${email}</p>
                   <p>Phone: ${phone}</p>
                   <p>Message: ${message}</p>`,
        };

        await contactEmail.sendMail(mail);

        return {
            statusCode: 200,
            body: JSON.stringify({ code: 200, status: "Message Sent" })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
