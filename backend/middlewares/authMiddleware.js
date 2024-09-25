import asyncHandler from 'express-async-handler';
import { verifyToken } from '../utils/jwtUtils.js';
import { getUserById } from '../repository/userRepository.js';
import { CustomError } from './errorMiddleware.js';

export const protect = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;


    if (authHeader === undefined) {
        throw new CustomError("Not Authorized, No token", 401);
    }

    if (!authHeader.startsWith('Bearer ')) {
        throw new CustomError("Not Authorized, Invalid token format", 401);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        throw new CustomError("Not Authorized, Token is missing", 401);
    }


    const { userId } = verifyToken(token);
    const user = await getUserById(userId);
    if (!user) {
        throw new CustomError("Not Found", 404);
    }
    req.user = user;
    next();
});