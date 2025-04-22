import { errorHandler } from "./error.js";


export const verifyAdmin = (req, res, next) => {
    if (!req.user) {
        return next(errorHandler(401, 'You are not authenticated!'));
    }

    if (req.user.status !== 1) {
        return next(errorHandler(403, 'Access denied! Admins only.'));
    }

    next();
};
