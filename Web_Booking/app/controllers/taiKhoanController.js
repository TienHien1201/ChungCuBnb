// app/controllers/taiKhoanController.js
const TaiKhoan = require('../models/taiKhoanModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllTaiKhoan = async (req, res) => {
    try {
        const taiKhoans = await TaiKhoan.findAll(); 
        res.json(taiKhoans);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu tài khoản', error: err });
    }
};

// Tạo tài khoản mới
const createTaiKhoan = async (req, res) => {
  const { email, mat_khau, quyen } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await TaiKhoan.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }
    
    // Mã hóa mật khẩu trước khi lưu
    const saltRounds = 10;  // Số vòng "salt" để tạo độ khó
    const hashedPassword = await bcrypt.hash(mat_khau, saltRounds);

    // Tạo tài khoản mới
    const taiKhoan = await TaiKhoan.create({ email, mat_khau: hashedPassword, quyen });
    res.status(201).json(taiKhoan);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo tài khoản', error: err });
  }
};

// Đăng nhập tài khoản
const loginTaiKhoan = async (req, res) => {
    const { email, mat_khau } = req.body;
    try {
      const user = await TaiKhoan.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Tài khoản không tồn tại' });
      }
      
      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(mat_khau, user.mat_khau);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Mật khẩu không đúng' });
      }

      // Tạo token
      const token = jwt.sign({ id: user.id, email: user.email, quyen: user.quyen }, 'secret', { expiresIn: '1h' });
      
      // Trả về token
      res.status(200).json({ message: 'Đăng nhập thành công', token });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi khi đăng nhập', error: err });
    }
};
const deleteTaiKhoan = async (req, res) => {
    const { id } = req.params; 
    console.log('Xóa tài khoản với ID:', id);
    try {
      const result = await TaiKhoan.destroy({ where: { id } });
      console.log('Kết quả xóa:', result); 
      if (!result) {
        return res.status(404).json({ message: 'Tài khoản không tồn tại' });
      }
      
      res.status(200).json({ message: 'Tài khoản đã được xóa thành công' });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi khi xóa tài khoản', error: err });
    }
  };
  const updateTaiKhoan = async (req, res) => {
    const { id } = req.params; 
    const { email, mat_khau, quyen } = req.body; 
    
    try {
      const taiKhoan = await TaiKhoan.findOne({ where: { id } });
      if (!taiKhoan) {
        return res.status(404).json({ message: 'Tài khoản không tồn tại' });
      }
  
      if (mat_khau) {
        const saltRounds = 10;
        taiKhoan.mat_khau = await bcrypt.hash(mat_khau, saltRounds);
      }
      taiKhoan.quyen = quyen || taiKhoan.quyen;
      await taiKhoan.save();
      res.status(200).json({ message: 'Tài khoản đã được cập nhật', taiKhoan });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi khi sửa tài khoản', error: err });
    }
  };
  
module.exports = {
  getAllTaiKhoan,
  createTaiKhoan,
  loginTaiKhoan,
  updateTaiKhoan,
  deleteTaiKhoan
};
