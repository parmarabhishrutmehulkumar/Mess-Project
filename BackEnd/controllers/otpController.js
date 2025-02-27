const nodemailer = require('nodemailer');

let otpStore = {}; // Temporary store for OTPs, consider using a database for production

// Function to send OTP
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  console.log(req.body)
  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port : 587,
    secure: false,
    auth: {
      user: 'messstaff236@gmail.com',
      pass: 'sywd sodu dldy lxzn',
    },
  });


async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"mess-staff" <messstaff236@gmail.com>',
    to: `${email}`,
    subject: `your verification code ${otp}`, 
    text: `your verification code ${otp}`,
    html: "<b></b>",
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
main().catch(console.error);
res.json({otp})

}


// Function to verify OTP
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  console.log(req.body)


  if (otpStore[email] && otpStore[email] === parseInt(otp)) {
    delete otpStore[email]; // Remove OTP after verification
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
};
