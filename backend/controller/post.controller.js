import Post from "../model/post.model.js";
import mongoose from "mongoose";

// Tạo bài post mới
export const createPost = async (req, res) => {
    try {
        const { userId, caption } = req.body;
        
        // Kiểm tra có file ảnh không
        if (!req.processedImage) {
            return res.status(400).json({ message: "Image is required." });
        }

        // Tạo đường dẫn ảnh với file webp đã xử lý
        const image = `${req.protocol}://${req.get('host')}/uploads/${req.processedImage.filename}`;

        // Tạo bài post mới
        const newPost = new Post({
            userId,
            image,
            caption,
        });

        await newPost.save();
        res.status(201).json({ message: "Post created successfully!", data: newPost });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Lấy danh sách tất cả bài post (không phân trang)
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()

        res.status(200).json({
            message: "Posts retrieved successfully!",
            data: posts,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Cập nhật bài post
export const updatePost = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "No such post"})
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, {...req.body}, {new: true})
        res.status(200).json({success: true, message: updatedPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Server Error"})    
    }
};


// Xóa bài post
export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No such post" });
    }
    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Post deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });    
    }
};
