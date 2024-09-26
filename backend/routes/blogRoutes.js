import express, { Router } from 'express';
import { protect, protectOptional } from '../middlewares/authMiddleware.js';
import { createNewBlog, deleteBlog, getAllBlogsRoute, getDashBlogs, getSingleBlog, updateBlog } from '../controller/blogController.js';

const blogRouter = express.Router();

blogRouter.route("/")
    .post(protect, createNewBlog)
    .get(getAllBlogsRoute);

blogRouter.get("/dashboard", protect, getDashBlogs);

blogRouter.route("/:blogId")
    .get(protectOptional, getSingleBlog)
    .patch(protect, updateBlog)
    .delete(protect, deleteBlog);


export default blogRouter;