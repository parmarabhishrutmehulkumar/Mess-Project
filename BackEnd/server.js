const express = require('express');
const dotenv = require('dotenv');
const ConnectDb = require('./config/db');
const mongoose = require('mongoose');
const authRoutes = require("./Routes/authRoutes");
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const actualmenuRoutes = require('./routes/actualmenuRoutes');

dotenv.config();  
const app = express();
app.use(express.json());
  

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use("/api/actualmenu", actualmenuRoutes);
app.use("/api/order", orderRoutes);  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});