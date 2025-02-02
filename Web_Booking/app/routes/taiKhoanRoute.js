// app/routes/taiKhoanRoute.js
const express = require('express');
const router = express.Router();
const taiKhoanController = require('../controllers/taiKhoanController');

router.get('/tai-khoan', taiKhoanController.getAllTaiKhoan);
router.post('/register', taiKhoanController.createTaiKhoan);
router.post('/login', taiKhoanController.loginTaiKhoan);
router.put('/tai-khoan/:id', taiKhoanController.updateTaiKhoan);
router.delete('/tai-khoan/:id', taiKhoanController.deleteTaiKhoan);
module.exports = router;
