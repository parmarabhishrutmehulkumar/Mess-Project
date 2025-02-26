const express = require("express");
const { placeOrder, getMenuItems } = require("../controllers/actualMenuController");
const { verifyToken } = require("../config/verifyToken");
const router = express.Router();

// Middleware to check if user is mess-staff
const checkMessStaff = (req, res, next) => {
  if (req.user && req.user.role === "mess-staff") {
    next(); // Proceed if user is mess-staff
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
};

// Route to place an order (only mess-staff can access)
router.post("/add", verifyToken, checkMessStaff, placeOrder);

// Route to get menu items (accessible to everyone)
router.get("/", getMenuItems);

module.exports = router;
