const { Asset, Transaction } = require('../models');

class TransactionService {
  static async createTransaction(userId, data) {
    try {
      // Validasi asset milik user
      const asset = await Asset.findOne({
        where: { id: data.asset_id, user_id: userId },
      });

      if (!asset) {
        const error = new Error('Aset tidak ditemukan');
        error.status = 404;
        throw error;
      }

      // Create transaction
      const transaction = await Transaction.create({
        user_id: userId,
        asset_id: data.asset_id,
        category_id: data.category_id,
        tanggal: data.tanggal || new Date(),
        tipe: data.tipe,
        jumlah: data.jumlah,
        catatan: data.catatan,
        is_recurring: data.is_recurring || false,
        recurring_type: data.recurring_type,
        is_bookmarked: data.is_bookmarked || false,
      });

      // Update asset balance (double-entry bookkeeping)
      if (data.tipe === 'income') {
        asset.saldo = parseFloat(asset.saldo) + parseFloat(data.jumlah);
      } else {
        asset.saldo = parseFloat(asset.saldo) - parseFloat(data.jumlah);
      }
      await asset.save();

      return {
        success: true,
        message: 'Transaksi berhasil dibuat',
        transaction,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getTransactions(userId, filters = {}) {
    try {
      const where = { user_id: userId };

      if (filters.startDate && filters.endDate) {
        where.tanggal = {
          [require('sequelize').Op.between]: [filters.startDate, filters.endDate],
        };
      }

      if (filters.asset_id) {
        where.asset_id = filters.asset_id;
      }

      if (filters.category_id) {
        where.category_id = filters.category_id;
      }

      if (filters.tipe) {
        where.tipe = filters.tipe;
      }

      const transactions = await Transaction.findAll({
        where,
        include: ['asset', 'category'],
        order: [['tanggal', 'DESC']],
        limit: filters.limit || 50,
        offset: filters.offset || 0,
      });

      return {
        success: true,
        transactions,
      };
    } catch (error) {
      throw error;
    }
  }

  static async updateTransaction(userId, transactionId, data) {
    try {
      const transaction = await Transaction.findOne({
        where: { id: transactionId, user_id: userId },
      });

      if (!transaction) {
        const error = new Error('Transaksi tidak ditemukan');
        error.status = 404;
        throw error;
      }

      // Update transaction
      await transaction.update(data);

      return {
        success: true,
        message: 'Transaksi berhasil diperbarui',
        transaction,
      };
    } catch (error) {
      throw error;
    }
  }

  static async deleteTransaction(userId, transactionId) {
    try {
      const transaction = await Transaction.findOne({
        where: { id: transactionId, user_id: userId },
      });

      if (!transaction) {
        const error = new Error('Transaksi tidak ditemukan');
        error.status = 404;
        throw error;
      }

      // Reverse asset balance
      const asset = await Asset.findByPk(transaction.asset_id);
      if (transaction.tipe === 'income') {
        asset.saldo = parseFloat(asset.saldo) - parseFloat(transaction.jumlah);
      } else {
        asset.saldo = parseFloat(asset.saldo) + parseFloat(transaction.jumlah);
      }
      await asset.save();

      await transaction.destroy();

      return {
        success: true,
        message: 'Transaksi berhasil dihapus',
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TransactionService;
