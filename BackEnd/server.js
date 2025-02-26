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
<<<<<<< HEAD
app.use("/api/staff",StaffRoutes); 
app.use("/api/order", orderRoutes);
app.use("/api/attendence",AttendenceRoutes);  
=======
app.use("/api/staff", StaffRoutes); 
app.use("/api/order", orderRoutes);  
>>>>>>> 41b0c94699d1ce9ff9f01d73838760fc0de1452b

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
