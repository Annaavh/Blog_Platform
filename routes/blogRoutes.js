import express from "express";
import { getBlogs, createBlog, getSingleBlog, updateBlog, deleteBlog } from "../controllers/blogController.js";
import { createComment, deleteComment} from "../controllers/commentController.js";

const router = express.Router();


router.route("/:id/comments/:commentId").delete(deleteComment);

router.route("/:id/comments").post(createComment);

router.route("/:id").get(getSingleBlog).put(updateBlog).delete(deleteBlog);

router.route("/").get(getBlogs).post(createBlog);


export default router;