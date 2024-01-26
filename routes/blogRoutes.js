import express from "express";
import { getBlogs, createBlog, getSingleBlog, updateBlog, deleteBlog } from "../controllers/blogController.js";

const router = express.Router();

router.route("/:id").get(getSingleBlog).put(updateBlog).delete(deleteBlog);
router.route("/").get(getBlogs).post(createBlog);


export default router;