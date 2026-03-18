const express = require('express');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.post('/message', authMiddleware, chatController.saveChatMessage);
router.get('/history', authMiddleware, chatController.getChatHistory);

module.exports = router;
