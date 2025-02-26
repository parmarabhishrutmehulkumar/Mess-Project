const express = require("express");
const Attendance = require("../models/Attendence");
const Student = require("../models/students");
const { verifyToken} = require("../config/verifyToken");
const { AttendanceController } = require("../controllers/attendenceController");


const router = express.Router();

router.post("/markattendance", verifyToken, AttendanceController);

module.exports = router;