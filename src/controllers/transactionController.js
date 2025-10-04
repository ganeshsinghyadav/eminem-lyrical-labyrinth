const TransactionService = require('../services/transactionService');
const Joi = require('joi');

// Validation schemas
const createTransactionSchema = Joi.object({
  fromAccountId: Joi.number().integer().positive().when('transactionType', {
    is: Joi.string().valid('transfer', 'withdrawal'),
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  toAccountId: Joi.number().integer().positive().when('transactionType', {
    is: Joi.string().valid('transfer', 'deposit'),
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  amount: Joi.number().positive().precision(2).required(),
  transactionType: Joi.string().valid('transfer', 'deposit', 'withdrawal').required(),
  description: Joi.string().max(500).optional()
});

/**
 * POST /transactions
 * Creates a new transaction with proper concurrency control
 * Handles race conditions using PostgreSQL row-level locking and retry logic
 */
const createTransaction = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = createTransactionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    
    const { fromAccountId, toAccountId, amount, transactionType, description } = value;
    
    // Additional business logic validation
    if (transactionType === 'transfer' && fromAccountId === toAccountId) {
      return res.status(400).json({
        success: false,
        error: 'Cannot transfer to the same account'
      });
    }
    
    // Create transaction with retry logic
    const result = await TransactionService.createTransaction({
      fromAccountId,
      toAccountId,
      amount,
      transactionType,
      description: description || `${transactionType} transaction`
    });
    
    res.status(201).json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Transaction creation error:', error);
    
    // Handle specific error types
    if (error.message.includes('Insufficient balance')) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient balance',
        message: error.message
      });
    }
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: 'Account not found',
        message: error.message
      });
    }
    
    if (error.message.includes('Concurrent modification') || error.message.includes('retries')) {
      return res.status(409).json({
        success: false,
        error: 'Concurrency conflict',
        message: 'Transaction failed due to concurrent modifications. Please retry.',
        retryable: true
      });
    }
    
    // Generic server error
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An unexpected error occurred while processing the transaction'
    });
  }
};

/**
 * GET /transactions/:accountId
 * Gets transaction history for a specific account
 */
const getTransactionHistory = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { limit = 50, offset = 0 } = req.query;
    
    // Validate parameters
    const accountIdNum = parseInt(accountId);
    if (isNaN(accountIdNum) || accountIdNum <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid account ID'
      });
    }
    
    const limitNum = parseInt(limit);
    const offsetNum = parseInt(offset);
    
    if (isNaN(limitNum) || limitNum <= 0 || limitNum > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid limit. Must be between 1 and 100'
      });
    }
    
    if (isNaN(offsetNum) || offsetNum < 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid offset. Must be >= 0'
      });
    }
    
    const transactions = await TransactionService.getTransactionHistory(
      accountIdNum, 
      limitNum, 
      offsetNum
    );
    
    res.json({
      success: true,
      data: {
        transactions,
        pagination: {
          limit: limitNum,
          offset: offsetNum,
          count: transactions.length
        }
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Get transaction history error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve transaction history'
    });
  }
};

/**
 * GET /accounts/:accountId/balance
 * Gets current balance for a specific account
 */
const getAccountBalance = async (req, res) => {
  try {
    const { accountId } = req.params;
    
    // Validate account ID
    const accountIdNum = parseInt(accountId);
    if (isNaN(accountIdNum) || accountIdNum <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid account ID'
      });
    }
    
    const account = await TransactionService.getAccountBalance(accountIdNum);
    
    if (!account) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        accountId: account.id,
        accountNumber: account.account_number,
        balance: parseFloat(account.balance),
        version: account.version,
        lastUpdated: account.updated_at
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Get account balance error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve account balance'
    });
  }
};

/**
 * Health check endpoint
 */
const healthCheck = async (req, res) => {
  try {
    // Test database connection
    const pool = require('../config/database');
    await pool.query('SELECT 1');
    
    res.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
};

module.exports = {
  createTransaction,
  getTransactionHistory,
  getAccountBalance,
  healthCheck
};
