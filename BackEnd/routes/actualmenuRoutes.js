
const express = require('express');
const {placeOrder, getMenuItems} = require('../controllers/actualMenuController');
const { verifyToken } = require('../config/verifyToken');
const router = express.Router();

router.post("/add",verifyToken  ,(req,res,next)=>{

    if(req.user.role === "mess-staff") next();
    else res.status(401).json({ message: "Access Denied" });
}, placeOrder);


    if (req.user.role === "mess-staff") next();
    else res.status(200).json({ message: "Accessed" });


router.get("/", getMenuItems);

module.exports = router;
