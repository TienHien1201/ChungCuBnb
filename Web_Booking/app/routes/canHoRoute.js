// routes/canHoRoute.js
const express = require('express');
const router = express.Router();
const canHoController = require('../controllers/canhoController');

router.get('/can-ho', canHoController.getAllCanHo);
router.get('/can-ho/anh', canHoController.getAllCanHoWithImages);
router.get('/can-ho/:id', canHoController.getCanHoById);
router.get('/can-ho/:id/anh', canHoController.getAllCanHoWithImagesById);
router.post('/can-ho', canHoController.createCanHo);
router.put('/can-ho/:id', canHoController.updateCanHo);
router.delete('/can-ho/:id', canHoController.deleteCanHo);

module.exports = router;
