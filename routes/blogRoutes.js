import express from "express";
import { getBlogs, createBlog, getSingleBlog, updateBlog, deleteBlog } from "../controllers/blogController.js";
import { createComment, deleteComment } from "../controllers/commentController.js";
import validateToken from "../middleware/validateToken.js";
import authorization from "../middleware/authorization.js";

const router = express.Router();


router.route("/:id/comments/:commentId").delete(validateToken,authorization, deleteComment);

router.route("/:id/comments").post(validateToken, createComment);

router.route("/:id").get(getSingleBlog).put(validateToken,authorization, updateBlog).delete(validateToken,authorization, deleteBlog);

router.route("/").get(getBlogs).post(validateToken, createBlog);


export default router;