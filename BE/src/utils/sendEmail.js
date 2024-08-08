import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (email, title, content) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SEND_OTP_EMAIL,
                pass: process.env.SEND_OTP_EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: `"Binh An Store" <${process.env.SEND_OTP_EMAIL}>`,
            to: email,
            subject: title,
            html: content,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return false;
            } else {
                return true;
            }
        });
    } catch (error) {
        return false;
    }
};

export default sendEmail;