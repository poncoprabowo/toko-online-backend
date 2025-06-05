const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, cartController.getCartItems);
router.post('/add', authenticate, cartController.addToCart);
router.delete('/:productId', authenticate, cartController.removeFromCart);
router.put('/:productId', authenticate, cartController.updateCartItem);

module.exports = router;