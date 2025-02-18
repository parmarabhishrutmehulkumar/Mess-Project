const mongoose = require('mongoose');

const messStaffSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'mess-staff' },
});

module.exports = mongoose.model('MessStaff', messStaffSchema);