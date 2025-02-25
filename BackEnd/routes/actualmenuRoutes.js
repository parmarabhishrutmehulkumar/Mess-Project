const express = require("express");
const {
  actualMenuController,
  getMenuItems,
} = require("../controllers/actualMenuController");
const { verifyToken } = require("../config/verifyToken");
const router = express.Router();

router.post(
  "/add",verifyToken,
  (req, res, next) => {
    if (!req.user) {
      console.log(req.user);
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    const role = req.user.role; // Now safe to access

    if (req.user.role === "mess-staff") next();
    else res.status(200).json({ message: "Accessed" });
  },
  actualMenuController
);

router.get("/", getMenuItems);

module.exports = router;
