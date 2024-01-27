import mongoose from "mongoose";


const blogSchema = mongoose.Schema({
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
    },
    comments: [{
        _id: mongoose.Schema.Types.ObjectId,
        content: String,
        author: String,
        created_at:Date
    }]

});

const Blog = mongoose.model("blogs", blogSchema);

export default Blog;