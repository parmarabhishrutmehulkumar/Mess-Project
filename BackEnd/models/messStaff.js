const mongoose = require('mongoose');

const messStaffSchema = new mongoose.Schema({
  email: String,
  password: String,
  confirmPassword : String
});

module.exports = mongoose.model('MessStaff', messStaffSchema);