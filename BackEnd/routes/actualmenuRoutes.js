
const express = require('express');
const {placeOrder, getMenuItems} = require('../controllers/actualMenuController');
const { verifyToken } = require('../config/verifyToken');
const router = express.Router();

router.post("/add",verifyToken  ,(req,res,next)=>{
    if(req.user.role === "mess-staff") next();
    else res.status(401).json({ message: "Access Denied" });
}, placeOrder);

router.get("/",(req,res,next)=>{
    if(req.user.role === "mess-staff") next();
    else res.status(401).json({ message: "Access Denied" });
}, getMenuItems);

module.exports = router;
