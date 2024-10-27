import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';  // Assuming this connects to MongoDB
import userRouter from './routes/user.route.js';
import jobRouter from './routes/job.route.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL,  // Client URL from environment variables
    credentials: true  // Allow credentials (cookies, headers, etc.)
}));

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Use routers for user and job routes
app.use('/api/users', userRouter);  // It's more RESTful to separate user routes
app.use('/api/jobs', jobRouter);     // Same for job routes

// Serve static files from the 'uploads/' directory
app.use('/uploads', express.static(path.resolve('uploads')));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/dist')));

    // Ensure to use 'req' and 'res' correctly
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
    });
}

// Connect to the database and start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit(1);  // Exit the process if the database connection fails
    });
