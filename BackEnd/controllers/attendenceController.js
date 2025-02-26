const students = require("../models/students");
const Attendance = require("../models/Attendence")

const AttendanceController =  async (req, res) => {
  try {
    const { qrCodeData } = req.body;
    const date = new Date().toISOString().split("T")[0]; 

    const UID = qrCodeData.split(":")[1];
    const student = await students.findOne({ UID });

    if (!student) return res.status(404).json({ message: "Student not found" });

    const existingRecord = await Attendance.findOne({ studentUID: student.UID, date });
    if (existingRecord) return res.status(400).json({ message: "Attendance already marked today" });

    await Attendance.create({ studentUID: student.UID, date });

    res.json({
      message: "Attendance marked successfully",
      student: {
        name: student.name,
        email: student.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark attendance" });
  }
}

module.exports = { AttendanceController };