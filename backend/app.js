const express = require("express");
const cors = require("cors");

const app = express(); // <-- Move this here, before any app.use()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const routineRoutes = require("./routes/routineRoutes");
const otpRoutes = require("./routes/otpRoutes");
const uploadRoute = require("./routes/uploadRoutes");

// Middleware
app.use(express.json());

// Route Setup
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/routine", routineRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api", uploadRoute);
app.use("/uploads", express.static("uploads"));

// Base route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to Verlaine Backend!");
});

app.get("/api/ping", (req, res) => {
  res.json("Pong from Verlaine backend 🧖‍♀️✨");
});


// Export
module.exports = app;
