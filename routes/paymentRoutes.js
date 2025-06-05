const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/create', authenticate, paymentController.createPayment);
router.post('/webhook', paymentController.handleWebhook); // tidak perlu auth

module.exports = router;