import express from "express";
import { authUser, deleteUserProfile, getUserProfile, registerUser, updateUserProfile } from "../controller/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/auth", authUser);
userRouter.route("/profile")
    .get(protect, getUserProfile)
    .patch(protect, updateUserProfile)
    .delete(protect, deleteUserProfile);

export default userRouter;