const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail"); 

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Username, email, and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || "user",
    });

    const token = generateToken(user);
    const { password: _, ...safeUser } = user._doc;

    res.status(201).json({ success: true, user: safeUser, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Signup failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);
    user.otp = hashedOTP;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendEmail(user.email, `Your Verlaine OTP is: ${otp}`);

    res.status(200).json({ success: true, message: "OTP sent to your email." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed", error: err.message });
  }
};

exports.verifyLoginOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    if (!user || !user.otp || !user.otpExpires || Date.now() > user.otpExpires) {
      return res.status(400).json({ success: false, message: "OTP expired or invalid" });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect OTP" });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = generateToken(user);
    const { password: _, ...safeUser } = user._doc;

    res.status(200).json({ success: true, user: safeUser, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "OTP verification failed", error: err.message });
  }
};

exports.googleAuth = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, message: "Google token is required" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username: name,
        email,
        googleId,
        password: "",
        avatar: picture,
        role: "user",
      });
    }

    const appToken = generateToken(user);
    const { password: _, ...safeUser } = user._doc;

    res.status(200).json({ success: true, user: safeUser, token: appToken });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({ success: false, message: "Invalid Google token" });
  }
};