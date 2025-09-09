import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const EmalilUtiliy = async(EmailTo, EmailText, EmailSubject) => {

    try {
        const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your Google App Password
      },
    });

    // 2. Email details
    const mailOptions = {
      from: `"IMS System" <${process.env.EMAIL_USER}>`, // sender name + email
      to: EmailTo,         // recipient
      subject: EmailSubject, // subject
      html: EmailText       // email body (HTML)
    };

    return await transporter.sendMail(mailOptions);
        
    } catch (error) {
        console.error("Email sending error:", error);
    throw new Error("Email could not be sent");
        
    }
}
export default EmalilUtiliy;