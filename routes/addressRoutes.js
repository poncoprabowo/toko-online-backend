const express = require('express');
const router = express.Router();
const { getAddresses, addAddress } = require('../controllers/addressController');
const auth = require('../middleware/auth');

router.get('/', auth, getAddresses);
router.post('/', auth, addAddress);

module.exports = router;