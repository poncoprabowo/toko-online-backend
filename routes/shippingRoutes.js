const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

router.get('/provinces', shippingController.getProvinces);
router.get('/cities/:province_id', shippingController.getCitiesByProvince);
router.post('/calculate', shippingController.calculateShipping);

module.exports = router;