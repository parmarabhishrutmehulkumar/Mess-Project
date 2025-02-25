const MessStaff = require('../models/messStaff');
const bcrypt = require('bcrypt');
const generateToken = require("../config/generateToken")

const staffSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await MessStaff.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new MessStaff({
            name,       
            email,
            password: hashedPassword,
            role: 'mess-staff',
        });

        // Save the user to the database
        await user.save();

        const token = generateToken(user._id, user.role);

        res.status(201).json({ message: 'User registered successfully' , user, token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const staffSignin = async (req, res) => {
    try {    
        const { email, password } = req.body;
        const user = await MessStaff.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);    
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { staffSignup, staffSignin };