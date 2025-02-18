const express = require('express');
const { signup, signin } = require('../controllers/authController');
const router = express.Router();

// Signup route (for student/faculty/mess-staff)
router.post('/signup', signup);

// Signin route (for student/faculty/mess-staff)
router.post('/signin', signin);

module.exports = router;