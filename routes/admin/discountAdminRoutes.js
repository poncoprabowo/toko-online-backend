const express = require('express');
const router = express.Router();
const discountAdminController = require('../../controllers/admin/discountAdminController');
const { isAdmin } = require('../../middleware/adminMiddleware');

router.get('/discounts', isAdmin, discountAdminController.getAllDiscounts);
router.post('/discounts', isAdmin, discountAdminController.createDiscount);
router.put('/discounts/:id', isAdmin, discountAdminController.updateDiscount);
router.delete('/discounts/:id', isAdmin, discountAdminController.deleteDiscount);

module.exports = router;