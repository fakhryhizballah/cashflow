const TransactionService = require('../services/TransactionService');
const { body } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');

class TransactionController {
  static async createTransaction(req, res, next) {
    try {
      const result = await TransactionService.createTransaction(req.userId, req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getTransactions(req, res, next) {
    try {
      const filters = {
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        asset_id: req.query.asset_id,
        category_id: req.query.category_id,
        tipe: req.query.tipe,
        limit: req.query.limit,
        offset: req.query.offset,
      };
      const result = await TransactionService.getTransactions(req.userId, filters);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const result = await TransactionService.updateTransaction(req.userId, id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const result = await TransactionService.deleteTransaction(req.userId, id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

// Validation rules
TransactionController.createValidation = [
  body('asset_id').isInt().withMessage('Asset ID harus berupa angka'),
  body('category_id').isInt().withMessage('Category ID harus berupa angka'),
  body('tipe').isIn(['income', 'expense']).withMessage('Tipe harus income atau expense'),
  body('jumlah').isFloat({ gt: 0 }).withMessage('Jumlah harus lebih dari 0'),
  validationMiddleware,
];

TransactionController.updateValidation = [
  body('tipe').optional().isIn(['income', 'expense']).withMessage('Tipe harus income atau expense'),
  body('jumlah').optional().isFloat({ gt: 0 }).withMessage('Jumlah harus lebih dari 0'),
  validationMiddleware,
];

module.exports = TransactionController;
