const Student = require("../models/students");
const Faculty = require("../models/faculty");
const MessStaff = require("../models/messStaff");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");
const qrcode = require("qrcode");
// Signup function for Student, Faculty, and MessStaff
exports.signup = async (req, res) => {
  const { name, email, password, role, UID } = req.body;

  console.log(req.body)
  try {
    let user;
    const hashedpassword = await bcrypt.hash(password, 10);
    
    // Generate a unique QR code based on the user's email or UID
    const qrCodeData = `${UID}`;
    const qrCodeUrl = await qrcode.toDataURL(qrCodeData);

    if (role === "student") {
      user = new Student({ name, email, password: hashedpassword, role, UID, qrCode: qrCodeUrl });
    } else if (role === "faculty") {
      user = new Faculty({ name, email, password: hashedpassword, role, UID });
    } 

    await user.save();
    const token = generateToken(user._id, role);

    res.status(200).json({ msg: "Signup successful", user, token });
  } catch (error) {
    res.status(500).json({ msg: "Error signing up", error });
  }
};

// Signin function for Student, Faculty, and MessStaff
exports.signin = async (req, res) => {
  const { email, password, role } = req.body;

  console.log(req.body);
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
    qrCode: user.qrCode, // Retrieve the stored QR code
    token: generateToken(user._id, role),
  };

  res.status(200).json({ msg: "Signin successful", userDetails });
};
