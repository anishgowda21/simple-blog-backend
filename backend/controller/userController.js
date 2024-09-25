import asyncHandler from 'express-async-handler';
import { createUser, deleteUser, getUserByEmail, getUserById, updateUser } from '../repository/userRepository.js';
import { CustomError } from '../middlewares/errorMiddleware.js';
import { generateToken } from '../utils/jwtUtils.js';
import { hashPassword, matchPassword } from '../utils/bcryptUtils.js';

//@desc Register new user
//route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new CustomError('Please provide all required fields', 400);
    }

    const existingUser = await getUserByEmail(email);
    console.log(existingUser);


    if (existingUser) {
        throw new CustomError("User With Email Already Exists", 400);
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser(name, email, passwordHash);
    const token = generateToken(user.id);

    return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token
    });

});

//@desc Auth user/get token
//route POST /api/users/auth
//@access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError('Please provide all required fields', 400);
    }

    const user = await getUserByEmail(email);

    if (user && (await matchPassword(user.password, password))) {
        const token = generateToken(user.id);
        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token
        });
    } else {
        throw new CustomError('Email and Password do not match', 401);
    }
});

//@desc Get user profile
//route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    };
    return res.status(200).json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const updateUserObj = { id: req.user.id };

    updateUserObj.name = req.body.name || req.user.name;
    updateUserObj.email = req.body.email || req.user.email;

    const newUser = await updateUser(updateUserObj);

    return res.status(200).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,

    });
});

const deleteUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    await deleteUser(userId);
    return res.status(204).end();

})

export {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
}