const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or your provider (e.g. SendGrid, Outlook)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email
 * @param {string} to - Recipient email address
 * @param {string} message - Email content (HTML or plain text)
 */
const sendEmail = async (to, message) => {
  const mailOptions = {
    from: `"Verlaine Skincare" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Verlaine OTP Code",
    html: `<div style="font-family:sans-serif;padding:16px">
             <h2>Your OTP Code</h2>
             <p>${message}</p>
             <p style="color:#999;">This OTP is valid for 5 minutes.</p>
           </div>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
