const express = require("express");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const routineRoutes = require("./routes/routineRoutes");
const otpRoutes = require("./routes/otpRoutes"); // Import otpRoutes

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/routine", routineRoutes);
app.use("/api/users", userRoutes);
app.use("/api/otp", otpRoutes); // Use otpRoutes

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Verlaine Backend!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB bitch💅"))
  .catch((err) => console.error("Ayyoo,baby MongoDB connection failed 💔", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🐦‍🔥`);
});

module.exports = app;