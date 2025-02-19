const express = require('express');
const {placeOrder, getOrders} = require("../controllers/orderController");
const {verifyToken,roleCheck} = require('../config/verifyToken');

const router = express.Router();

router.post('/place',verifyToken,roleCheck(["faculty"]), placeOrder);
router.get('/',verifyToken, roleCheck(["faculty"]), getOrders);    

module.exports = router;
