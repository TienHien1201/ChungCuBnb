const express = require('express');
const router = express.Router();
const phanKhuController = require('../controllers/phanKhuController');

router.get('/phan-khu', phanKhuController.getAllPhanKhu);
router.get('/phan-khu/can-ho', phanKhuController.getPhanKhuCoCanHo);
router.get('/phan-khu/:id', phanKhuController.getPhanKhuById);
router.get('/phan-khu/:id/can-ho', phanKhuController.getPhanKhuCoCanHoById);
router.post('/phan-khu', phanKhuController.createPhanKhu);
router.put('/phan-khu/:id', phanKhuController.updatePhanKhu);
router.delete('/phan-khu/:id', phanKhuController.deletePhanKhu);



module.exports = router;
