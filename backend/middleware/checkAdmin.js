const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkAdmin = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id }); // fix here
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only." });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = checkAdmin;