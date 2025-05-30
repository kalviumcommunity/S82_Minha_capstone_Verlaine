const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');

// Utility: Generate a 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Utility: Send OTP email with logging and error handling
const sendOTPEmail = async (user, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.response);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error; // rethrow to handle in sendOTP
  }
};

// Route: Send OTP
exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    try {
      await sendOTPEmail(user, otp);
      res.status(200).json({ message: 'OTP sent to email' });
    } catch (emailErr) {
      res.status(500).json({ message: 'Failed to send OTP email', error: emailErr.message });
    }
  } catch (err) {
    console.error('❌ Error in sendOTP:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Route: Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > user.otpExpires) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error('❌ Error in verifyOTP:', err);
    res.status(500).json({ message: 'Error verifying OTP', error: err.message });
  }
};
