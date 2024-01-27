import Comment from "../models/commentsModel.js";
import { constants } from "../constants.js";
import Blog from "../models/blogsModel.js";

const { OK, VALIDATION_ERROR, NOT_FOUND, SERVER_ERROR } = constants;

export const createComment = async (req, res) => {
    try {
        const { content, author } = req.body;
        const { id } = req.params;

        if (!content || !author) {
            return res.status(VALIDATION_ERROR).json({ error: "All fields are mandatory!" });
        }

        const comment = new Comment({ content, author, blog: id });
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
        const comment = await Comment.findById(commentId);
        if (!comment) {
            res.status(NOT_FOUND).json({ error: "Comment not found" });
            return;
        }
        await Comment.deleteOne({ _id: req.params.id });

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(NOT_FOUND).json({ error: "Blog is not found" });
        }

        res.status(OK).json({ message: "Comment deleted successfully", updatedBlog });
    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: 'Internal server error' });
    }
};
