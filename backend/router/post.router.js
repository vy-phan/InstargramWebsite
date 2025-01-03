import express from "express";
import { createPost, getPosts, updatePost, deletePost } from "../controller/post.controller.js";

const router = express.Router();

// Tạo bài post mới
router.post("/", createPost);

// Lấy danh sách bài post 
router.get("/", getPosts);

// Cập nhật bài post
router.put("/:id", updatePost);


// Xóa bài post
router.delete("/:id", deletePost);

export default router;
