import Comment from "../models/commentsModel.js";
import { constants } from "../constants.js";
import Blog from "../models/blogsModel.js";

const { OK, VALIDATION_ERROR, NOT_FOUND, SERVER_ERROR } = constants;

export const createComment = async (req, res) => {

    try {

        const { content } = req.body;
        const { id } = req.params;
        const {username} = req.user;

        if (!content) {
            return res.status(VALIDATION_ERROR).json({ error: "All fields are mandatory!" });
        }

        const comment = new Comment({ content, author:username, blog: id,user_id:req.user.id });
        const blog = await Blog.findById(id);

        if (!blog) {
            res.status(NOT_FOUND).json({ error: "Blog is not found" });
            return;
        }
     

        blog.comments.push(comment);
        await comment.save();
        await blog.save();

        res.status(OK).json(comment);
    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: 'Internal server error' });
    }
};


export const deleteComment = async (req, res) => {
    const { id, commentId } = req.params;

    try {

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );

        await Comment.deleteOne({ _id: req.params.id });

        res.status(OK).json({ message: "Comment deleted successfully", updatedBlog });
    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: 'Internal server error' });
    }
};
