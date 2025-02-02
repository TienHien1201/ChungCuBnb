const express = require('express');
const router = express.Router();
const hinhAnhCanHoController = require('../controllers/hinhAnhCanHoController');

router.get('/hinh-anh-can-ho', hinhAnhCanHoController.getAllImages);
router.get('/hinh-anh-can-ho/:id_can_ho', hinhAnhCanHoController.getImagesByCanHoId);
router.post('/hinh-anh-can-ho/', hinhAnhCanHoController.createImage);
router.put('/hinh-anh-can-ho/:id', hinhAnhCanHoController.updateImage);
router.delete('/hinh-anh-can-ho/:id', hinhAnhCanHoController.deleteImage);

module.exports = router;
