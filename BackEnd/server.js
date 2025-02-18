import express from 'express'; 
const app = express();
const PORT = 3000;
import connectDB from './config/db.js';
import cors from "cors"
// Middleware to parse JSON requests
app.use(express.json());
connectDB();
app.use(cors()) 

app.use("/signup",UserRoute)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
