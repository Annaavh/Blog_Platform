import mongoose from "mongoose";

export const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, "Please add the comment content"]
    },
    author: {
        type: String,
        required: [true, "Please add the comment author"]
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
