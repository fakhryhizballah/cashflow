const { Category } = require('../models');
const { body } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');

class CategoryController {
  static async createCategory(req, res, next) {
    try {
      const category = await Category.create({
        user_id: req.userId,
        nama_kategori: req.body.nama_kategori,
        tipe: req.body.tipe,
        warna: req.body.warna || '#4F46E5',
      });

      res.status(201).json({
        success: true,
        message: 'Kategori berhasil dibuat',
        category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        where: { user_id: req.userId },
      });

      res.status(200).json({
        success: true,
        categories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const category = await Category.findOne({
        where: { id: req.params.id, user_id: req.userId },
      });

      if (!category) {
        const error = new Error('Kategori tidak ditemukan');
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        success: true,
        category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const category = await Category.findOne({
        where: { id: req.params.id, user_id: req.userId },
      });

      if (!category) {
        const error = new Error('Kategori tidak ditemukan');
        error.status = 404;
        throw error;
      }

      await category.update(req.body);

      res.status(200).json({
        success: true,
        message: 'Kategori berhasil diperbarui',
        category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const category = await Category.findOne({
        where: { id: req.params.id, user_id: req.userId },
      });

      if (!category) {
        const error = new Error('Kategori tidak ditemukan');
        error.status = 404;
        throw error;
      }

      await category.destroy();

      res.status(200).json({
        success: true,
        message: 'Kategori berhasil dihapus',
      });
    } catch (error) {
      next(error);
    }
  }
}

// Validation rules
CategoryController.createValidation = [
  body('nama_kategori').trim().notEmpty().withMessage('Nama kategori tidak boleh kosong'),
  body('tipe').isIn(['income', 'expense']).withMessage('Tipe harus income atau expense'),
  body('warna').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Warna harus format hex yang valid'),
  validationMiddleware,
];

CategoryController.updateValidation = [
  body('nama_kategori').optional().trim().notEmpty().withMessage('Nama kategori tidak boleh kosong'),
  body('tipe').optional().isIn(['income', 'expense']).withMessage('Tipe harus income atau expense'),
  body('warna').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Warna harus format hex yang valid'),
  validationMiddleware,
];

module.exports = CategoryController;
