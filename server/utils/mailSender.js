const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            service:"gmail",
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: 'CodeNova',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        return info;
    } catch (error) {
        console.log("error occurred while sending email in mailSender utils", error);
    }
};

module.exports = mailSender;
