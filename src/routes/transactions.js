const express = require('express');
const rateLimit = require('express-rate-limit');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

// Rate limiting for transaction endpoints
// Prevents abuse and helps manage concurrent request load
const transactionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests',
    message: 'Too many transaction requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all transaction routes
router.use(transactionLimiter);

// Transaction routes
router.post('/', transactionController.createTransaction);
router.get('/:accountId', transactionController.getTransactionHistory);
router.get('/:accountId/balance', transactionController.getAccountBalance);

module.exports = router;
