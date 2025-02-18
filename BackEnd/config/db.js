import mongoose from 'mongoose';
import  configDotenv  from 'dotenv';
configDotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
           
        });
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
};

export default connectDB