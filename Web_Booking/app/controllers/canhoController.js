const { HinhAnhCanHo, CanHo,PhanKhu } = require('../models/app')
// Helper function to check if PhanKhu exists
const checkPhanKhuExists = async (ma_phan_khu) => {
    if (ma_phan_khu) {
        const phanKhuExists = await PhanKhu.findByPk(ma_phan_khu);
        if (!phanKhuExists) {
            throw new Error('Mã phân khu không tồn tại');
        }
    }
};

// Lấy danh sách căn hộ
const getAllCanHo = async (req, res) => {
    try {
        const data = await CanHo.findAll({
            include: [
                { model: PhanKhu, as: 'phan_khu' },
            ]
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
};
const getAllCanHoWithImages = async (req, res) => {
    try {
        const data = await CanHo.findAll({
            include: [
                { model: PhanKhu, as: 'phan_khu' },
                { model: HinhAnhCanHo, as: 'hinh_anh', attributes:['id','duong_dan_hinh'] }
            ]
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
};

// Lấy căn hộ theo ID
const getCanHoById = async (req, res) => {
    try {
        const { id } = req.params;
        const canHo = await CanHo.findByPk(id, {
            include: [{ model: PhanKhu, as: 'phan_khu' }]
        });

        if (!canHo) {
            return res.status(404).json({ message: 'Không tìm thấy căn hộ' });
        }

        res.status(200).json(canHo);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
};
const getAllCanHoWithImagesById = async (req, res) => {
    try {
        const { id } = req.params;
        const canHo = await CanHo.findByPk(id, {
            include: [{ model: PhanKhu, as: 'phan_khu' },
                { model: HinhAnhCanHo, as: 'hinh_anh', attributes:['id','duong_dan_hinh'] }
            ]
        });

        if (!canHo) {
            return res.status(404).json({ message: 'Không tìm thấy căn hộ' });
        }

        res.status(200).json(canHo);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
};


// Thêm căn hộ mới (Kiểm tra mã phân khu)
const createCanHo = async (req, res) => {
    try {
        const { ma_phan_khu } = req.body;

        // Kiểm tra xem mã phân khu có tồn tại không
        await checkPhanKhuExists(ma_phan_khu);

        const newCanHo = await CanHo.create(req.body);
        res.status(201).json(newCanHo);
    } catch (err) {
        res.status(err.message === 'Mã phân khu không tồn tại' ? 400 : 500).json({ message: err.message, error: err });
    }
};

// Cập nhật thông tin căn hộ (Kiểm tra mã phân khu)
const updateCanHo = async (req, res) => {
    try {
        const { id } = req.params;
        const { ma_phan_khu } = req.body;

        const canHo = await CanHo.findByPk(id);
        if (!canHo) {
            return res.status(404).json({ message: 'Không tìm thấy căn hộ' });
        }

        // Kiểm tra mã phân khu nếu có thay đổi
        await checkPhanKhuExists(ma_phan_khu);

        await canHo.update(req.body);
        res.status(200).json({ message: 'Cập nhật thành công', canHo });
    } catch (err) {
        res.status(err.message === 'Mã phân khu không tồn tại' ? 400 : 500).json({ message: err.message, error: err });
    }
};

// Xóa căn hộ
const deleteCanHo = async (req, res) => {
    try {
        const { id } = req.params;
        const canHo = await CanHo.findByPk(id);

        if (!canHo) {
            return res.status(404).json({ message: 'Không tìm thấy căn hộ' });
        }

        await canHo.destroy();
        res.status(200).json({ message: 'Xóa thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
};

module.exports = {
    getAllCanHo,
    deleteCanHo,
    updateCanHo,
    getCanHoById,
    createCanHo,
    getAllCanHoWithImages,
    getAllCanHoWithImagesById
};
