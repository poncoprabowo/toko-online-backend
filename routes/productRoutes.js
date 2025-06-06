// routes/productRoutes.js

const express = require('express');
const router = express.Router();

// Import controller
const productController = require('../controllers/productController');

// Route benar tanpa tanda kurung
router.get('/', productController.getAllProducts); // ✅ Benar

module.exports = router;