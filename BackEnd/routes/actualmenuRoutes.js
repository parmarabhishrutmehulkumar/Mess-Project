const express = require('express');
const {actualMenuController, getMenuItems} = require('../controllers/actualMenuController');
const router = express.Router();

router.post("/add",(req,res,next)=>{
    if(req.user.role === "mess-staff") next();
    else res.status(401).json({ message: "Access Denied" });
}, actualMenuController)

router.get("/",getMenuItems)

module.exports = router