const { Asset } = require('../models');
const { body } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');

class AssetController {
  static async createAsset(req, res, next) {
    try {
      const asset = await Asset.create({
        user_id: req.userId,
        nama_aset: req.body.nama_aset,
        tipe_aset: req.body.tipe_aset,
        saldo: req.body.saldo || 0,
        mata_uang: req.body.mata_uang || 'IDR',
      });

      res.status(201).json({
        success: true,
        message: 'Aset berhasil dibuat',
        asset,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAssets(req, res, next) {
    try {
      const assets = await Asset.findAll({
        where: { user_id: req.userId },
      });

      res.status(200).json({
        success: true,
        assets,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAssetById(req, res, next) {
    try {
      const asset = await Asset.findOne({
        where: { id: req.params.id, user_id: req.userId },
      });

      if (!asset) {
        const error = new Error('Aset tidak ditemukan');
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        success: true,
        asset,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateAsset(req, res, next) {
    try {
      const asset = await Asset.findOne({
        where: { id: req.params.id, user_id: req.userId },
      });

      if (!asset) {
        const error = new Error('Aset tidak ditemukan');
        error.status = 404;
        throw error;
      }

      await asset.update(req.body);

      res.status(200).json({
        success: true,
        message: 'Aset berhasil diperbarui',
        asset,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAsset(req, res, next) {
    try {
      const asset = await Asset.findOne({
        where: { id: req.params.id, user_id: req.userId },
      });

      if (!asset) {
        const error = new Error('Aset tidak ditemukan');
        error.status = 404;
        throw error;
      }

      await asset.destroy();

      res.status(200).json({
        success: true,
        message: 'Aset berhasil dihapus',
      });
    } catch (error) {
      next(error);
    }
  }
}

// Validation rules
AssetController.createValidation = [
  body('nama_aset').trim().notEmpty().withMessage('Nama aset tidak boleh kosong'),
  body('tipe_aset').isIn(['bank', 'kartu_debit', 'kartu_kredit', 'dompet', 'investasi', 'lainnya']).withMessage('Tipe aset tidak valid'),
  body('saldo').optional().isFloat({ min: 0 }).withMessage('Saldo harus 0 atau lebih'),
  validationMiddleware,
];

AssetController.updateValidation = [
  body('nama_aset').optional().trim().notEmpty().withMessage('Nama aset tidak boleh kosong'),
  body('tipe_aset').optional().isIn(['bank', 'kartu_debit', 'kartu_kredit', 'dompet', 'investasi', 'lainnya']).withMessage('Tipe aset tidak valid'),
  body('saldo').optional().isFloat({ min: 0 }).withMessage('Saldo harus 0 atau lebih'),
  validationMiddleware,
];

module.exports = AssetController;
