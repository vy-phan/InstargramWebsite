import express from "express";
import { login, logout, signup } from "../controller/user.controller.js";


const router = express.Router();

// Đăng ký người dùng mới
router.post("/signup", signup);
// Đăng nhập người dùng
router.post("/login", login);
// Đăng xuất người dùng
router.post("/logout", logout);

export default router;
