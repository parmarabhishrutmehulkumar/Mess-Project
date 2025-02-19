const express = require('express');
const {placeOrder, getOrders} = require("../controllers/orderController");
const {verifyToken,roleCheck} = require('../config/verifyToken');

const router = express.Router();

router.post('/place',verifyToken,roleCheck(["Faculty"]), placeOrder);
router.get('/',verifyToken, roleCheck(["Faculty"]), getOrders);    

module.exports = router;
