const express = require("express");
const User = require("../models/User");
const checkAdmin = require("../middleware/checkAdmin");
const router = express.Router();

// Post endpoint is used
router.post("/add", checkAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).json({ message: "User created successfully.", user: newUser });
  } catch (err) {
    res.status(400).json({ message: "Error creating user.", error: err });
  }
});


router.delete("/delete/:id", checkAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    res.status(400).json({ message: "Error deleting user.", error: err });
  }
});


router.patch("/update-role/:id", checkAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User role updated.", user });
  } catch (err) {
    res.status(400).json({ message: "Error updating user role.", error: err });
  }
});

module.exports = router;