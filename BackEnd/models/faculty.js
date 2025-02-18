const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'faculty' },
  UID: String,
});

module.exports = mongoose.model('Faculty', facultySchema);