const express = require('express');
const router = express.Router();
const productAdminController = require('../../controllers/admin/productAdminController');
const { isAdmin } = require('../../middleware/adminMiddleware');
const upload = require('../../middleware/uploadMiddleware');

router.get('/products', isAdmin, productAdminController.getAllProducts);
router.post('/products', isAdmin, upload.single('image'), productAdminController.createProduct);
router.put('/products/:id', isAdmin, upload.single('image'), productAdminController.updateProduct);
router.delete('/products/:id', isAdmin, productAdminController.deleteProduct);

module.exports = router;