const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'student' },
  UID: String,
});

module.exports = mongoose.model('Student', studentSchema);