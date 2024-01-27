import Blog from "../models/blogsModel.js";
import { constants } from "../constants.js";

const { OK, VALIDATION_ERROR, NOT_FOUND } = constants;

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(OK).json(blogs)
    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: 'Internal server error' });
    }

}


export const createBlog = async (req, res) => {

    try {
        const { title, body, author } = req.body;

        if (!title || !body || !author) {
            res.status(VALIDATION_ERROR).json({error:"All fields are mandatory !"});
        }
        const blog = await Blog.create({
            title, body, author
        })
        res.status(OK).json(blog)
    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: 'Internal server error' });
    }



}


export const getSingleBlog = async (req, res) => {

    try {
        const blog = await findBlog(req.params.id, res);
        res.status(OK).json(blog);
    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: 'Internal server error' });
    }


};


export const updateBlog = async (req, res) => {

    try {
        const blog = await findBlog(req.params.id, res);
        const updatedFields = {
            ...req.body, updated_at: new Date()
        }
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id, updatedFields, { new: true }
        )
        res.status(OK).json(updatedBlog)
    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: 'Internal server error' });
    }

};


export const deleteBlog = async (req, res) => {
    try {
        const blog = await findBlog(req.params.id, res);
        await Blog.deleteOne({ _id: req.params.id });
        res.status(OK).json(blog)
    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: 'Internal server error' });
    }

}


const findBlog = async (id, res) => {

    const blog = await Blog.findById(id);
    if (!blog) {
        res.status(NOT_FOUND).json({ error: "Blog is not found" });
        return;
    }
    return blog;
}
