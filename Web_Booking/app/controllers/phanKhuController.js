const {sequelize, HinhAnhCanHo, CanHo,PhanKhu } = require('../models/app')

// Lấy tất cả phân khu
const getAllPhanKhu = async (req, res) => {
    try {
        const phanKhuList = await PhanKhu.findAll();
        res.status(200).json(phanKhuList);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách phân khu', error });
    }
};

const getPhanKhuCoCanHo = async (req, res) => {
    try {
        const phanKhuList = await PhanKhu.findAll({
            include: [{
                model: CanHo,
                as: 'can_ho', 
            }]
        });

        res.status(200).json(phanKhuList);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy phân khu có căn hộ', error });
    }
};
// Lấy phân khu theo ID
const getPhanKhuCoCanHoById = async (req, res) => {
    const { id } = req.params;
    try {
        const phanKhu = await PhanKhu.findByPk(id,{
            include: [{
                model: CanHo,
                as: 'can_ho', 
            }]
        });
        if (!phanKhu) {
            return res.status(404).json({ message: 'Phân khu không tồn tại' });
        }
        res.status(200).json(phanKhu);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin phân khu', error });
    }
};
const getPhanKhuById = async (req, res) => {
    const { id } = req.params;
    try {
        const phanKhu = await PhanKhu.findByPk(id);
        if (!phanKhu) {
            return res.status(404).json({ message: 'Phân khu không tồn tại' });
        }
        res.status(200).json(phanKhu);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin phân khu', error });
    }
};
// Thêm phân khu mới
const createPhanKhu = async (req, res) => {
    const { ten_phan_khu, dia_chi, quy_mo, tien_ich, loai_hinh_san_pham } = req.body;
    try {
        const newPhanKhu = await PhanKhu.create({
            ten_phan_khu,
            dia_chi,
            quy_mo,
            tien_ich,
            loai_hinh_san_pham
        });
        res.status(201).json({ message: 'Thêm phân khu thành công', phanKhu: newPhanKhu });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm phân khu', error });
    }
};

// Cập nhật phân khu
const updatePhanKhu = async (req, res) => {
    const { id } = req.params;
    const { ten_phan_khu, dia_chi, quy_mo, tien_ich, loai_hinh_san_pham } = req.body;

    try {
        const phanKhu = await PhanKhu.findByPk(id);
        if (!phanKhu) {
            return res.status(404).json({ message: 'Phân khu không tồn tại' });
        }

        // Cập nhật các trường
        phanKhu.ten_phan_khu = ten_phan_khu || phanKhu.ten_phan_khu;
        phanKhu.dia_chi = dia_chi || phanKhu.dia_chi;
        phanKhu.quy_mo = quy_mo || phanKhu.quy_mo;
        phanKhu.tien_ich = tien_ich || phanKhu.tien_ich;
        phanKhu.loai_hinh_san_pham = loai_hinh_san_pham || phanKhu.loai_hinh_san_pham;

        await phanKhu.save();
        res.status(200).json({ message: 'Phân khu đã được cập nhật', phanKhu });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật phân khu', error });
    }
};

// Xóa phân khu
const deletePhanKhu = async (req, res) => {
    const { id } = req.params;

    try {
        const phanKhu = await PhanKhu.findByPk(id);
        if (!phanKhu) {
            return res.status(404).json({ message: 'Phân khu không tồn tại' });
        }

        await phanKhu.destroy();
        res.status(200).json({ message: 'Phân khu đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa phân khu', error });
    }
};

module.exports = {
    getAllPhanKhu,
    getPhanKhuById,
    createPhanKhu,
    updatePhanKhu,
    deletePhanKhu,
    getPhanKhuCoCanHo,
    getPhanKhuCoCanHoById
};
