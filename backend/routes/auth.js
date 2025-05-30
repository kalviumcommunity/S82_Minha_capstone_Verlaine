const express = require("express");
const router = express.Router();
const { signup, login, googleAuth, verifyLoginOTP } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-login-otp", verifyLoginOTP);
router.post("/google", googleAuth);

module.exports = router;
