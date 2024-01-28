import { constants } from "../constants.js";
import Blog from "../models/blogsModel.js";
import Comment from "../models/commentsModel.js";

const {
    VALIDATION_ERROR,
    SERVER_ERROR,
    OK,
    FORBIDDEN,
    NOT_FOUND,
    UNAUTHORIZED,
} = constants;

const authorization = async (req, res, next) => {
    const { id, commentId } = req.params;
    const { user } = req;

    try {
        let entity;
        let errorMessage;

        if (commentId) {
            entity = await Comment.findById(commentId);
            errorMessage = "Comment not found";
        } else {
            entity = await Blog.findById(id);
            errorMessage = "Blog not found";
        }

        if (!entity) {
            return res.status(NOT_FOUND).json({ error: errorMessage });
        }

        if (entity.user_id.toString() !== user.id) {
            return res.status(FORBIDDEN).json({ error: "User is not authorized to access this resource" });
        }

        next();
    } catch (error) {
        console.error("Error in authorization middleware:", error);
        res.status(SERVER_ERROR).json({ error: "Internal server error" });
    }
};

export default authorization;
