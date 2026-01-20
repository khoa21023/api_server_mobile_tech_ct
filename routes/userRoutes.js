import express from 'express';
import uploadCloud from '../config/upload.js';
import { login, register, logout, getProfile,updateProfile, uploadAvatar, changePassword, resetPassword } from '../controllers/userController.js';
import { verifyToken,isCustomer,isAdmin } from '../middleware/auth.js';
const router = express.Router();

const handleUpload = (req, res, next) => {
    const uploadFunc = upload.single('avatar');
    
    uploadFunc(req, res, (err) => {
        if (err) {
            console.error("LỖI UPLOAD MULTER:", err); // Hiện log trên Render để check
            // Trả về JSON lỗi để App hiện thông báo thay vì "Unexpected end of input"
            return res.status(400).json({ 
                success: false, 
                message: "Lỗi Upload Ảnh: " + (err.message || err) 
            });
        }
        next(); // Nếu không lỗi thì đi tiếp sang controller uploadAvatar
    });
};

// 1. Kiểm tra Token -> 2. Kiểm tra Quyền -> 3. Cập nhật
router.put('/update-profile', verifyToken, isCustomer, updateProfile); 
// 1. Kiểm tra Token -> 2. Kiểm tra Quyền -> 3. Hiển thị Profile
router.get('/profile', verifyToken, isCustomer, getProfile);
// 1. Kiểm tra Token -> 2. Kiểm tra Quyền -> 3. Nhận File -> 4. Xử lý lưu DB
router.post('/avatar', verifyToken, isCustomer, handleUpload, uploadAvatar);

router.post('/register', register); 
router.post('/login', login);
router.post('/logout', verifyToken, logout);
// Đổi mật khẩu (Cần đăng nhập)
router.put('/change-password', verifyToken, changePassword);
// Quên mật khẩu (Không cần đăng nhập)
router.post('/reset-password', resetPassword);
export default router;