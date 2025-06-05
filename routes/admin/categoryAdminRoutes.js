const express = require('express');
const router = express.Router();
const categoryAdminController = require('../../controllers/admin/categoryAdminController');
const { isAdmin } = require('../../middleware/adminMiddleware');
const upload = require('../../middleware/uploadMiddleware');

router.get('/categories', isAdmin, categoryAdminController.getAllCategories);
router.post('/categories', isAdmin, upload.single('image'), categoryAdminController.createCategory);
router.put('/categories/:id', isAdmin, upload.single('image'), categoryAdminController.updateCategory);
router.delete('/categories/:id', isAdmin, categoryAdminController.deleteCategory);

module.exports = router;