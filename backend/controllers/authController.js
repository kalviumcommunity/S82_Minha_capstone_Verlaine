const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user);

    
    const { password: _, ...safeUser } = user._doc;

    res.status(201).json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    
    const { password: _, ...safeUser } = user._doc;

    res.status(200).json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};