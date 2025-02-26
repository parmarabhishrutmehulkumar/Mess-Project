const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDatabase = require('./config/db');  // Fix: Corrected function name
const authRoutes = require("./Routes/authRoutes");
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const StaffRoutes = require('./routes/staffRoutes');
const AttendenceRoutes = require('./routes/AttendenceRoutes');
const actualmenuRoutes = require('./routes/actualmenuRoutes');

dotenv.config();  

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

connectDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use("/api/actualmenu", actualmenuRoutes);
app.use("/api/staff",StaffRoutes); 
app.use("/api/order", orderRoutes);
app.use("/api/attendence",AttendenceRoutes);  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
