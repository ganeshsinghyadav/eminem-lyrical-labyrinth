const pool = require('../config/database');

class TransactionService {
  /**
   * Creates a new transaction with proper concurrency control
   * Uses PostgreSQL row-level locking (SELECT ... FOR UPDATE) to prevent race conditions
   * Implements retry logic for transient failures
   */
  static async createTransaction(transactionData, maxRetries = 3) {
    const { fromAccountId, toAccountId, amount, transactionType, description } = transactionData;
    
    let retryCount = 0;
    
    while (retryCount <= maxRetries) {
      const client = await pool.connect();
      
      try {
        // Start transaction with SERIALIZABLE isolation level
        // This ensures the highest level of consistency and prevents phantom reads
        await client.query('BEGIN ISOLATION LEVEL SERIALIZABLE');
        
        // Validate transaction data
        if (transactionType === 'transfer' && (!fromAccountId || !toAccountId)) {
          throw new Error('Transfer transactions require both from and to account IDs');
        }
        
        if (amount <= 0) {
          throw new Error('Transaction amount must be positive');
        }
        
        // For transfer transactions, lock both accounts to prevent concurrent modifications
        if (transactionType === 'transfer') {
          // Lock both accounts with FOR UPDATE to prevent concurrent balance changes
          const fromAccountQuery = `
            SELECT id, balance, version, account_number 
            FROM accounts 
            WHERE id = $1 
            FOR UPDATE
          `;
          const toAccountQuery = `
            SELECT id, balance, version, account_number 
            FROM accounts 
            WHERE id = $1 
            FOR UPDATE
          `;
          
          const [fromAccountResult, toAccountResult] = await Promise.all([
            client.query(fromAccountQuery, [fromAccountId]),
            client.query(toAccountQuery, [toAccountId])
          ]);
          
          if (fromAccountResult.rows.length === 0) {
            throw new Error(`Source account ${fromAccountId} not found`);
          }
          if (toAccountResult.rows.length === 0) {
            throw new Error(`Destination account ${toAccountId} not found`);
          }
          
          const fromAccount = fromAccountResult.rows[0];
          const toAccount = toAccountResult.rows[0];
          
          // Check if source account has sufficient balance
          if (fromAccount.balance < amount) {
            throw new Error(`Insufficient balance. Available: ${fromAccount.balance}, Required: ${amount}`);
          }
          
          // Create transaction record
          const transactionQuery = `
            INSERT INTO transactions (from_account_id, to_account_id, amount, transaction_type, description, status)
            VALUES ($1, $2, $3, $4, $5, 'pending')
            RETURNING id
          `;
          
          const transactionResult = await client.query(transactionQuery, [
            fromAccountId, toAccountId, amount, transactionType, description
          ]);
          
          const transactionId = transactionResult.rows[0].id;
          
          // Update account balances atomically
          const updateFromBalanceQuery = `
            UPDATE accounts 
            SET balance = balance - $1, version = version + 1
            WHERE id = $2 AND version = $3
            RETURNING balance, version
          `;
          
          const updateToBalanceQuery = `
            UPDATE accounts 
            SET balance = balance + $1, version = version + 1
            WHERE id = $2 AND version = $3
            RETURNING balance, version
          `;
          
          // Update both accounts with version check for optimistic concurrency control
          const [fromUpdateResult, toUpdateResult] = await Promise.all([
            client.query(updateFromBalanceQuery, [amount, fromAccountId, fromAccount.version]),
            client.query(updateToBalanceQuery, [amount, toAccountId, toAccount.version])
          ]);
          
          // Check if version updates were successful (prevents lost updates)
          if (fromUpdateResult.rows.length === 0) {
            throw new Error('Concurrent modification detected on source account. Please retry.');
          }
          if (toUpdateResult.rows.length === 0) {
            throw new Error('Concurrent modification detected on destination account. Please retry.');
          }
          
          // Mark transaction as completed
          await client.query(
            'UPDATE transactions SET status = $1, completed_at = CURRENT_TIMESTAMP WHERE id = $2',
            ['completed', transactionId]
          );
          
          // Commit the transaction
          await client.query('COMMIT');
          
          return {
            success: true,
            transactionId,
            fromAccountBalance: fromUpdateResult.rows[0].balance,
            toAccountBalance: toUpdateResult.rows[0].balance,
            message: 'Transaction completed successfully'
          };
          
        } else if (transactionType === 'deposit') {
          // For deposits, only lock the destination account
          const accountQuery = `
            SELECT id, balance, version, account_number 
            FROM accounts 
            WHERE id = $1 
            FOR UPDATE
          `;
          
          const accountResult = await client.query(accountQuery, [toAccountId]);
          
          if (accountResult.rows.length === 0) {
            throw new Error(`Account ${toAccountId} not found`);
          }
          
          const account = accountResult.rows[0];
          
          // Create transaction record
          const transactionQuery = `
            INSERT INTO transactions (to_account_id, amount, transaction_type, description, status)
            VALUES ($1, $2, $3, $4, 'pending')
            RETURNING id
          `;
          
          const transactionResult = await client.query(transactionQuery, [
            toAccountId, amount, transactionType, description
          ]);
          
          const transactionId = transactionResult.rows[0].id;
          
          // Update account balance
          const updateBalanceQuery = `
            UPDATE accounts 
            SET balance = balance + $1, version = version + 1
            WHERE id = $2 AND version = $3
            RETURNING balance, version
          `;
          
          const updateResult = await client.query(updateBalanceQuery, [
            amount, toAccountId, account.version
          ]);
          
          if (updateResult.rows.length === 0) {
            throw new Error('Concurrent modification detected. Please retry.');
          }
          
          // Mark transaction as completed
          await client.query(
            'UPDATE transactions SET status = $1, completed_at = CURRENT_TIMESTAMP WHERE id = $2',
            ['completed', transactionId]
          );
          
          // Commit the transaction
          await client.query('COMMIT');
          
          return {
            success: true,
            transactionId,
            accountBalance: updateResult.rows[0].balance,
            message: 'Deposit completed successfully'
          };
          
        } else if (transactionType === 'withdrawal') {
          // For withdrawals, only lock the source account
          const accountQuery = `
            SELECT id, balance, version, account_number 
            FROM accounts 
            WHERE id = $1 
            FOR UPDATE
          `;
          
          const accountResult = await client.query(accountQuery, [fromAccountId]);
          
          if (accountResult.rows.length === 0) {
            throw new Error(`Account ${fromAccountId} not found`);
          }
          
          const account = accountResult.rows[0];
          
          // Check if account has sufficient balance
          if (account.balance < amount) {
            throw new Error(`Insufficient balance. Available: ${account.balance}, Required: ${amount}`);
          }
          
          // Create transaction record
          const transactionQuery = `
            INSERT INTO transactions (from_account_id, amount, transaction_type, description, status)
            VALUES ($1, $2, $3, $4, 'pending')
            RETURNING id
          `;
          
          const transactionResult = await client.query(transactionQuery, [
            fromAccountId, amount, transactionType, description
          ]);
          
          const transactionId = transactionResult.rows[0].id;
          
          // Update account balance
          const updateBalanceQuery = `
            UPDATE accounts 
            SET balance = balance - $1, version = version + 1
            WHERE id = $2 AND version = $3
            RETURNING balance, version
          `;
          
          const updateResult = await client.query(updateBalanceQuery, [
            amount, fromAccountId, account.version
          ]);
          
          if (updateResult.rows.length === 0) {
            throw new Error('Concurrent modification detected. Please retry.');
          }
          
          // Mark transaction as completed
          await client.query(
            'UPDATE transactions SET status = $1, completed_at = CURRENT_TIMESTAMP WHERE id = $2',
            ['completed', transactionId]
          );
          
          // Commit the transaction
          await client.query('COMMIT');
          
          return {
            success: true,
            transactionId,
            accountBalance: updateResult.rows[0].balance,
            message: 'Withdrawal completed successfully'
          };
        }
        
      } catch (error) {
        // Rollback transaction on error
        await client.query('ROLLBACK');
        
        // Check if it's a serialization failure (concurrent transaction conflict)
        if (error.code === '40001' || error.message.includes('Concurrent modification detected')) {
          retryCount++;
          if (retryCount <= maxRetries) {
            console.log(`Serialization conflict detected. Retrying... (${retryCount}/${maxRetries})`);
            // Exponential backoff: wait 2^retryCount * 100ms
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 100));
            continue;
          }
        }
        
        throw error;
      } finally {
        client.release();
      }
    }
    
    throw new Error(`Transaction failed after ${maxRetries} retries`);
  }
  
  /**
   * Gets transaction history for an account
   */
  static async getTransactionHistory(accountId, limit = 50, offset = 0) {
    const client = await pool.connect();
    
    try {
      const query = `
        SELECT 
          t.id,
          t.from_account_id,
          t.to_account_id,
          t.amount,
          t.transaction_type,
          t.status,
          t.description,
          t.created_at,
          t.completed_at,
          fa.account_number as from_account_number,
          ta.account_number as to_account_number
        FROM transactions t
        LEFT JOIN accounts fa ON t.from_account_id = fa.id
        LEFT JOIN accounts ta ON t.to_account_id = ta.id
        WHERE t.from_account_id = $1 OR t.to_account_id = $1
        ORDER BY t.created_at DESC
        LIMIT $2 OFFSET $3
      `;
      
      const result = await client.query(query, [accountId, limit, offset]);
      return result.rows;
    } finally {
      client.release();
    }
  }
  
  /**
   * Gets account balance with current version
   */
  static async getAccountBalance(accountId) {
    const client = await pool.connect();
    
    try {
      const query = `
        SELECT id, account_number, balance, version, updated_at
        FROM accounts
        WHERE id = $1
      `;
      
      const result = await client.query(query, [accountId]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

module.exports = TransactionService;
