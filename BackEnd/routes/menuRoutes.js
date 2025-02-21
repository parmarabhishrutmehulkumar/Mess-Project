const express = require('express');
const { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const {verifyToken} = require('../config/verifyToken');
const router = express.Router();

router.post('/add', verifyToken,(req,res,next)=>{
    if(req.user.role === "mess-staff") next();

    else res.status(401).json({ message: "Access Denied" });

}, addMenuItem);
router.get('/', getMenuItems);
router.put('/update/:id', verifyToken,(req,res,next)=>{
    if(req.user.role === "mess-staff") next();
    else res.status(401).json({ message: "Access Denied" });
}, updateMenuItem);
router.delete('/delete/:id', verifyToken,(req,res,next)=>{
    if(req.user.role === "mess-staff") next();
    else res.status(401).json({ message: "Access Denied" });
}, deleteMenuItem);

module.exports = router;