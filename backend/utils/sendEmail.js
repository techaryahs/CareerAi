const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Email sent successfully to " + email);
  } catch (error) {
    console.log("Email not sent");
    console.error(error);
  }
};

module.exports = sendEmail;
