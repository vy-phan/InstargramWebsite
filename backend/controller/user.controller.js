import bcrypt from "bcryptjs";
import User from "../model/user.model.js";


// Regex kiểm tra email hợp lệ
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Kiểm tra định dạng email cơ bản
    return emailRegex.test(email);
};


// Đăng ký người dùng
export const signup = async (req, res) => {
    try {
        const { username, email, password, bio } = req.body;

        // Kiểm tra email hợp lệ
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }

        // Kiểm tra username không chứa ký tự đặc biệt
        const usernameRegex = /^[a-zA-Z0-9_]+$/; // Username chỉ chứa chữ cái, số và dấu gạch dưới
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ message: "Username must only contain letters, numbers, and underscores." });
        }

        // Kiểm tra bio không quá 150 ký tự
        if (bio && bio.length > 150) {
            return res.status(400).json({ message: "Bio must not exceed 150 characters." });
        }

        // Kiểm tra nếu email hoặc username đã tồn tại
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or username already exists." });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo user mới
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            bio
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Đăng nhập người dùng
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra email hợp lệ
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // Tìm user theo email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "Email không tồn tại." });
        }

        // Kiểm tra mật khẩu
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Mật khẩu không đúng." });
        }

        // Trả về tất cả thông tin người dùng (trừ password)
        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.status(200).json({ 
            message: "Đăng nhập thành công!", 
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Đăng xuất người dùng
export const logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logout successful!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Lấy thông tin người dùng theo ID
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Lấy danh sách tất cả người dùng
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json({ success: true, data: users }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
};

// Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
    try {
        const { username, email, password, profilePicture, bio } = req.body;
        const userId = req.params.id;

        // Validate email if provided
        if (email && !validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // Hash password if provided
        let updateData = { username, email, profilePicture, bio };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // Update user with new data
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
