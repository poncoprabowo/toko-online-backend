const express = require('express');
const router = express.Router();
const { getOrdersByUser, getOrderDetail, createOrder } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.get('/', auth, getOrdersByUser);
router.get('/:id', auth, getOrderDetail);
router.post('/', auth, createOrder);

module.exports = router;