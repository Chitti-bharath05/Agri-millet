const express = require('express');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.post('/create-order', authMiddleware, transactionController.createPaymentOrder);
router.post('/verify-payment', authMiddleware, transactionController.verifyPayment);
router.get('/my-transactions', authMiddleware, transactionController.getMyTransactions);
router.get('/:transactionId', authMiddleware, transactionController.getTransaction);
router.put('/delivery-status', authMiddleware, transactionController.updateDeliveryStatus);

module.exports = router;
