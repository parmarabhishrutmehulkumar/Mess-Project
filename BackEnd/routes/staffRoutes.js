const express = require('express');
const { staffSignup, staffSignin } = require('../controllers/staffController');


const router = express.Router();

router.post("/signup", staffSignup );
router.post("/signin", staffSignin )

module.exports = router