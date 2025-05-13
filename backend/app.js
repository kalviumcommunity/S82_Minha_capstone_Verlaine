// app.js
const express = require("express");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const routineRoutes = require("./routes/routineRoutes");
const otpRoutes = require("./routes/otpRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route Setup
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/routine", routineRoutes);
app.use("/api/otp", otpRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to Verlaine Backend!");
});

module.exports = app;
