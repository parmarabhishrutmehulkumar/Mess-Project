const express = require('express');
const actualMenuController = require('../controllers/actualMenuController');
const router = express.Router();

router.post("/add",(req,res,next)=>{
    if(req.user.role === "mess-staff") next();
    else res.status(401).json({ message: "Access Denied" });
}, actualMenuController)

module.exports = router