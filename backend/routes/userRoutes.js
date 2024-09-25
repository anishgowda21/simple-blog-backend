import express from "express";
import { authUser, deleteUserProfile, getUserProfile, registerUser, updateUserProfile } from "../controller/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.route("/profile")
    .get(protect, getUserProfile)
    .patch(protect, updateUserProfile)
    .delete(protect, deleteUserProfile);

export default router;