import express from "express";
import { login, logout, signup, getAllUsers, updateUser } from "../controller/user.controller.js";


const router = express.Router();

// Đăng ký người dùng mới
router.post("/signup", signup);
// Đăng nhập người dùng
router.post("/login", login);
// Đăng xuất người dùng
router.post("/logout", logout);

// Lấy tất cả người dùng
router.get("/", getAllUsers);

// Lấy người dùng theo id
router.put("/:id", updateUser);


export default router;
