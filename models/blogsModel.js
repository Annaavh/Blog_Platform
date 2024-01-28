import mongoose from "mongoose";


const blogSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    title: {
        type: String,
        required: [true, "Please add the blog title"]
    },
    body: {
        type: String,
        required: [true, "Please add the blog description"]
    },
    author: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    comments: [{
        _id: mongoose.Schema.Types.ObjectId,
        content: String,
        author: String,
        user_id: mongoose.Schema.Types.ObjectId,
        created_at: Date
    }]

});

const Blog = mongoose.model("blogs", blogSchema);

export default Blog;