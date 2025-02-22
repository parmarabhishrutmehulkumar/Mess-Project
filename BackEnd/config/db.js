const mongoose = require("mongoose");
require("dotenv").config(); // Ensure .env is loaded

const connectDatabase = () => {
    console.log("MongoDB URI:", process.env.MONGODB); // Debugging
    mongoose
        .connect("mongodb+srv://parmarabhishrut:J0lAkob9qFZWQjMs@mess.4tnci.mongodb.net/Mess?retryWrites=true&w=majority&appName=mess")
        .then(() => console.log("Database connected"))
        .catch((err) => {
            console.log("Database connection error:", err);
            process.exit(1);
        });
};

module.exports = connectDatabase;
