const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  studentUID: { type: String, required: true },
  date: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);