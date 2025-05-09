const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');


const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};


const sendOTPEmail = async (user, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};


exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    
    
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; 
    await user.save();

    await sendOTPEmail(user, otp);
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending OTP', error: err });
  }
};


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
    res.status(500).json({ message: 'Error verifying OTP', error: err });
  }
};