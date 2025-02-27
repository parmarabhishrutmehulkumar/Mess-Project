const MessStaff = require('../models/messStaff');
const bcrypt = require('bcrypt');
const generateToken = require("../config/generateToken");
const messStaff = require('../models/messStaff');

const staffSignup = async (req, res) => {
    try {
        const {  email, password, confirmPassword } = req.body;

    
        // Check if a user with the same email already exists
        const existingUser = await MessStaff.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        if(password !== confirmPassword){
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Create a new user
        const user = await MessStaff.create({  email, password: hashedPassword , confirmPassword });

    

        const token = generateToken(user._id);

        res.status(201).json({user, token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const staffSignin = async (req, res) => {
    try {    
        const { email, password } = req.body;
        console.log(req.body);
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