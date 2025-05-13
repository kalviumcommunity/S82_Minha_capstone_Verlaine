const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Define the schema for a user
const UserSchema = new mongoose.Schema(
  {
    // Username for the user
    username: {
      type: String,
      required: true,
      trim: true,
    },
    // User's email address (must be unique and lowercase)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    // Hashed password
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // Role of the user, defaults to "user"
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // OTP for login/verification
    otp: { type: String }, 
    otpExpires: { type: Date }, 
  },
  { timestamps: true }
);

// Hash the password before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);