const { HinhAnhCanHo, CanHo } = require('../models/app')
// Lấy tất cả hình ảnh căn hộ
const getAllImages = async (req, res) => {
    try {
        const images = await HinhAnhCanHo.findAll({
            include: [{ model: CanHo, as: 'can_ho' }]
        });
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err });
    }
};

// Lấy hình ảnh theo ID căn hộ
const getImagesByCanHoId = async (req, res) => {
    try {
        const { id_can_ho } = req.params;
        const images = await HinhAnhCanHo.findAll({
            where: { id_can_ho },
            include: [{ model: CanHo, as: 'can_ho' }]
        });

        if (images.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hình ảnh' });
        }

        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err });
    }
};

// Thêm hình ảnh mới (Kiểm tra căn hộ có tồn tại không)
const createImage = async (req, res) => {
    try {
        const { id_can_ho, duong_dan_hinh } = req.body;

        // Kiểm tra căn hộ có tồn tại không
        const canHoExists = await CanHo.findByPk(id_can_ho);
        if (!canHoExists) {
            return res.status(400).json({ message: 'Căn hộ không tồn tại' });
        }

        const newImage = await HinhAnhCanHo.create({ id_can_ho, duong_dan_hinh });
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err });
    }
};

// Cập nhật đường dẫn hình ảnh
const updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { duong_dan_hinh } = req.body;

        const image = await HinhAnhCanHo.findByPk(id);
        if (!image) {
            return res.status(404).json({ message: 'Không tìm thấy hình ảnh' });
        }

        await image.update({ duong_dan_hinh });
        res.status(200).json({ message: 'Cập nhật thành công', image });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err });
    }
};

// Xóa hình ảnh
const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await HinhAnhCanHo.findByPk(id);

        if (!image) {
            return res.status(404).json({ message: 'Không tìm thấy hình ảnh' });
        }

        await image.destroy();
        res.status(200).json({ message: 'Xóa hình ảnh thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err });
    }
};

module.exports = {
    getAllImages,
    getImagesByCanHoId,
    createImage,
    updateImage,
    deleteImage
};
