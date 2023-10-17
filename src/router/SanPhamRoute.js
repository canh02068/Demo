const loaiSPController = require('../controllers/SanPhamControllers');
const express = require('express');
const router = express.Router();

router.get('/sanpham', loaiSPController.getLoaiSPAll);
router.get('/sanpham/:id', loaiSPController.getLoaispById);
router.post('/sanpham', loaiSPController.createLoaisp);
router.post('/sanpham/update/:id', loaiSPController.updateLoaisp);
router.delete('/sanpham/delete/:id', loaiSPController.deleteLoaisp);

module.exports = router;