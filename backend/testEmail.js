// testEmail.js
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "m88315510@gmail.com",
  subject: "Test Email from Verlaine",
  text: "✅ If you see this, your email setup is working!",
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error("❌ Failed to send:", err);
  } else {
    console.log("✅ Sent:", info.response);
  }
});
