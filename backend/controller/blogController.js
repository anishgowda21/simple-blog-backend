import asyncHandler from 'express-async-handler';
import { validate as uuidValidate } from 'uuid';
import { CustomError } from '../middlewares/errorMiddleware.js';
import { createBlog, deleteBlogById, getAllBlogs, getBlogById, getDashboardBlogs, updateBlogById } from '../repository/blogRepository.js';
import { validateContent, validatePublished, validateTitle } from '../helpers/validators.js';


//@desc Create a new Blog
//route POST /api/blog
//@access Private
const createNewBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        throw new CustomError("Please provide all fields", 400);
    }

    const newBlog = await createBlog(title, content, req.user.id);

    return res.status(201).json({
        id: newBlog.id,
        title: newBlog.title,
        content: newBlog.content,
        userId: newBlog.user_id,
        createdAt: newBlog.created_at,
        updatedAt: newBlog.updated_at,
        published: newBlog.published,
    })
});

//@desc Get All Blogs
//route GET /api/blog
//@access Public
const getAllBlogsRoute = asyncHandler(async (req, res) => {
    const blogs = await getAllBlogs();
    return res.status(200).json(blogs);
});

//@desc Get All Blogs
//route GET /api/blog/dashboard
//@access Private
const getDashBlogs = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const blogs = await getDashboardBlogs(userId);

    return res.status(200).json(blogs);
});

//@desc Get All Blogs
//route GET /api/blog/:blogId
//@access Public/Private
const getSingleBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    if (!blogId || !uuidValidate(blogId)) {
        throw new CustomError("Please provide a valid blogId", 400);
    }

    const blog = await getBlogById(blogId);
    const loggedInUserId = req.user?.id || null;

    if ((blog) && (blog.published || loggedInUserId === blog.user.id)) {
        return res.status(200).json(blog);
    } else {
        throw new CustomError("Blog not found", 404);
    }
});

//@desc Update Blog
//route PATCH /api/blog/:blogId
//@access Private
const updateBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    if (!blogId || !uuidValidate(blogId)) {
        throw new CustomError("Please provide a valid blogId", 400);
    }

    const blog = await getBlogById(blogId);

    if (!blog || req.user.id !== blog.user.id) {
        throw new CustomError("Blog not found", 404);
    }

    const { title, content, published } = req.body;

    const updatedBlog = {
        id: blogId,
        title: validateTitle(title) || blog.title,
        content: validateContent(content) || blog.content,
        published: validatePublished(published) ?? blog.published,
    };

    const newBlog = await updateBlogById(updatedBlog);

    return res.status(200).json(newBlog);
});


//@desc Delete Blog
//route DELETE /api/blog/:blogId
//@access Private
const deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    if (!blogId || !uuidValidate(blogId)) {
        throw new CustomError("Please provide a valid blogId", 400);
    }

    const loggedInUserId = req.user.id;
    const blog = await deleteBlogById(blogId, loggedInUserId);

    if (!blog || req.user.id !== blog.user_id) {
        throw new CustomError("Blog not found", 404);
    }


    return res.status(204).end();
});



export {
    createNewBlog,
    getAllBlogsRoute,
    getDashBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
}