const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../controllers/otpController');

//post router is used to otp
router.post('/send-otp', sendOTP); 
// post router is used to verify otp
router.post('/verify-otp', verifyOTP); 

module.exports = router;