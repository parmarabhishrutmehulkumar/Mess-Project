const express = require('express');
const {placeOrder, getOrders} = require("../controllers/orderController");
const {verifyToken,isFaculty} = require('../config/verifyToken');

const router = express.Router();

router.post('/place',verifyToken,(req,res,next)=>{

    if(req.user.role === "faculty") next();
    else res.status(401).json({ message: "Access Denied" });
}, placeOrder);
router.get('/',verifyToken, (req,res,next)=>{

    console.log(req.user.role);
    if(req.user.role === "faculty") next();
    else res.status(401).json({ message: "Access Denied" });
}, getOrders);    

module.exports = router;
