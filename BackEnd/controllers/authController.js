const bcrypt = require('bcrypt');
const Student = require('../models/students');
const Faculty = require('../models/faculty');
const MessStaff = require('../models/messStaff');
const generateToken = require('../config/generateToken');

// Signup function for Student, Faculty, and MessStaff
exports.signup = async (req, res) => {
  const { name, email, password, role, UID } = req.body;

  let user;
  if (role === 'student') {
    user = await Student.findOne({ email });
  } else if (role === 'faculty') {
    user = await Faculty.findOne({ email });
  } else if (role === 'mess-staff') {
    user = await MessStaff.findOne({ email });
  }

  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    let newUser;
    if (role === 'student') {
      newUser = new Student({ name, email, password: hashedPassword, role, UID });
    } else if (role === 'faculty') {
      newUser = new Faculty({ name, email, password: hashedPassword, role, UID });
    } else if (role === 'mess-staff') {
      newUser = new MessStaff({ name, email, password: hashedPassword, role });
    }

    await newUser.save();
    const token = generateToken(newUser._id, newUser.role);
    res.status(201).json({ msg: 'Signup successful', token });

  } catch (error) {
    res.status(500).json({ msg: 'Error signing up user', error });
  }
};

// Signin function for Student, Faculty, and MessStaff
exports.signin = async (req, res) => {
  const { email, password, role } = req.body;
  let user;

  if (role === 'student') {
    user = await Student.findOne({ email });
  } else if (role === 'faculty') {
    user = await Faculty.findOne({ email });
  } else if (role === 'mess-staff') {
    user = await MessStaff.findOne({ email });
  }

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid password' });
  }

  const token = generateToken(user._id, user.role);
  res.status(200).json({ msg: 'Signin successful', token });
};