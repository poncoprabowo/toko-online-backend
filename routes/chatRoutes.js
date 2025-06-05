const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/chat/:user_id', authenticate, chatController.getChatHistory);

module.exports = router;