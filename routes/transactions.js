const express = require('express');
const TransactionController = require('../controllers/TransactionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Semua routes memerlukan auth
router.use(authMiddleware);

// CRUD Transactions
router.post('/', TransactionController.createValidation, (req, res, next) => {
  TransactionController.createTransaction(req, res, next);
});

router.get('/', (req, res, next) => {
  TransactionController.getTransactions(req, res, next);
});

router.put('/:id', TransactionController.updateValidation, (req, res, next) => {
  TransactionController.updateTransaction(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  TransactionController.deleteTransaction(req, res, next);
});

module.exports = router;
