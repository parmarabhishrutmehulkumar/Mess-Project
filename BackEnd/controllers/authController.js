const Student = require("../models/students");
const Faculty = require("../models/faculty");
const MessStaff = require("../models/messStaff");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");
// Signup function for Student, Faculty, and MessStaff
exports.signup = async (req, res) => {
  const { name, email, password, role, UID } = req.body;

  try {
    let user;
    const hashedpassword = await bcrypt.hash(password, 10);

    if (role === "student") {
      user = await new Student({ name, email, password: hashedpassword, role, UID }).save();
    } else if (role === "faculty") {
      user = await new Faculty({ name, email, password: hashedpassword, role, UID }).save();
    } 

    await user.save();
    const token = generateToken(user._id, role);

    return res.status(200).json({ msg: "Signup successful", user , token});


  } catch (error) {
    res.status(500).json({ msg: "Error signing up", error });
  }
};

// Signin function for Student, Faculty, and MessStaff
exports.signin = async (req, res) => {
  const { email, password, role } = req.body;
  let user;

  if (role === "student") {
    user = await Student.findOne({ email });
  } else if (role === "faculty") {
    user = await Faculty.findOne({ email });
  }

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  console.log(user);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid password" });
  }


  const userDetails = {
    name: user.name,
    email: user.email,
    role: user.role,
    UID: user.UID,
    token: generateToken(user._id,role),
  };
  res.status(200).json({ msg: "Signin successful", userDetails });
};
