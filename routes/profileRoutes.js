const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/profile', authenticate, profileController.getProfile);
router.put('/profile', authenticate, profileController.updateProfile);

router.get('/addresses', authenticate, profileController.getUserAddresses);
router.post('/addresses', authenticate, profileController.addUserAddress);
router.delete('/addresses/:addressId', authenticate, profileController.deleteUserAddress);
router.put('/addresses/set-default', authenticate, profileController.setDefaultAddress);

module.exports = router;