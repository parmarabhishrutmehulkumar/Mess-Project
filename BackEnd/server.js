import express from 'express'; 
const app = express();
const PORT = 3000;
import connectDB from './config/db.js';
// Middleware to parse JSON requests
app.use(express.json());
connectDB();
// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
