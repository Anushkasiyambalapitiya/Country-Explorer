import  jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';

// // middleware for user authentication 
// export const verifyToken = (req, res, next) => {
//     let token = req.cookies.token;  // First, check in cookies

//     if (!token && req.headers.authorization) {
//         token = req.headers.authorization.split(" ")[1]; // Check in headers
//     }

//     if (!token) return next(errorHandler(401, 'You are not authenticated!'));

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return next(errorHandler(403, 'Token is not valid!'));

//         req.user = user;
//         next();
//     });
// };


export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    console.log("Token received:", token);

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded; // Store user data in request

        console.log("Decoded token:", req.user)

        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(400).json({ error: "Invalid token." });
    }
};
