const express = require('express');
const { sendOtp, verifyOtp } = require('../controllers/otpController');
const router = express.Router();

// Route to send OTP
router.post("/", sendOtp);

// Route to verify OTP
router.post("/verify", verifyOtp);

module.exports = router;