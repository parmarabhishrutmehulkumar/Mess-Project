const express = require('express');
const dotenv = require('dotenv');
const ConnectDb = require('./Config/db');
const mongoose = require('mongoose');
const authRoutes = require("./Routes/authRoutes");
// const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');

dotenv.config();  

const app = express();


app.use(express.json());  

app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
app.use('/api/menu', menuRoutes);  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});