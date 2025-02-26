const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/purchaseController");

const router = express.Router();

// Create an order
router.post("/order", createOrder);

// Verify payment and generate QR code
router.post("/payment/verify", verifyPayment);

module.exports = router;