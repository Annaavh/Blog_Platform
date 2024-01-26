import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    title: {
        type: String,
        required: [true, "Please add the blog title"]
    },
    body: {
        type: String,
        required: [true, "Please add the blog description"]
    },
    author: {
        type: String,
        required: [true, "Please add the blog author"]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});


const Blog = mongoose.model("blogs", blogSchema);

export default Blog;