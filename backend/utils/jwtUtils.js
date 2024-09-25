import jwt from 'jsonwebtoken';
import { CustomError } from '../middlewares/errorMiddleware.js';

export const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '10h'
    });

    return token;
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error(error);
        if (error instanceof jwt.JsonWebTokenError) {
            throw new CustomError("Not Authorised, Expired token", 401);
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new CustomError("Not Authorised, Invalid token", 401);
        }
        throw new CustomError("Not Authorised, Unknown Error", 500);

    }
};