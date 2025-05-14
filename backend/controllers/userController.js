const User = require("../models/User");

// Get All Users Controller — Fetches all users from MongoDB
//read-oeration
// Entity: User — Retrieves all User documents, excludes password field
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get a single user by ID (admin or self)
// Entity: User — Fetches a specific User by ID; access restricted to self or admin
exports.getUserById = async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Update a user (admin or self only)
// Only the User who owns the data or an Admin can update the User entity
exports.updateUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: "Username and email are required." });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete a user (admin or self only)
// This affects related entities like Routines and JournalEntries via foreign key 
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};