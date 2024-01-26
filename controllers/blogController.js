import asyncHandler from "express-async-handler";
import Blog from "../models/blogsModel.js";
import { constants } from "../constants.js";

const { OK, VALIDATION_ERROR, NOT_FOUND } = constants;

export const getBlogs = asyncHandler(async (req, res) => {

    const blogs = await Blog.find();
    res.status(OK).json(blogs)
})


export const createBlog = asyncHandler(async (req, res) => {

    const { title, body, author } = req.body;

    if (!title || !body || !author) {
        res.status(VALIDATION_ERROR);
        throw new Error("All fields are mandatory !")
    }
    const blog = await Blog.create({
        title, body, author
    })
    res.status(OK).json(blog)

})


export const getSingleBlog = asyncHandler(async (req, res) => {

    const blog = await findBlog(req.params.id);

    res.status(OK).json(blog);


});


export const updateBlog = asyncHandler(async (req, res) => {

    const blog = await findBlog(req.params.id);
    const updatedFields = {
        ...req.body, updated_at: new Date()
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id, updatedFields, { new: true }
    )
    res.status(OK).json(updatedBlog)
})


export const deleteBlog = asyncHandler(async (req, res) => {

    const blog = await findBlog(req.params.id);
    await Blog.remove()
    res.status(OK).json(blog)
})


const findBlog = async (id) => {

    const blog = await Blog.findById(id);
    if (!blog) {
        res.status(NOT_FOUND);
        throw new Error("Blog is not found")
    }
    return blog;
}
