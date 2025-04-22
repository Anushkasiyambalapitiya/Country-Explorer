import express from 'express';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import cors from "cors"

import bodyParser from 'body-parser';
import connectDB from './db.js';
import UserRoute from './Routes/UserRoute.js';

dotenv.config();

const app = express();

// call middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use("/auth", UserRoute)
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // After server is up, try connecting to MongoDB
    connectDB();
  });

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

export default app;