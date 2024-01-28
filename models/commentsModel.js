import mongoose from "mongoose";

export const commentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    content: {
        type: String,
        required: [true, "Please add the comment content"]
    },
    author: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }
});

const Comment = mongoose.model("comment", commentSchema);

export default Comment;
