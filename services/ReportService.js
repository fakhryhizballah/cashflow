const { Asset, Category, Transaction } = require('../models');
const { Op } = require('sequelize');

class ReportService {
  static async getMonthlySummary(userId, year, month) {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const transactions = await Transaction.findAll({
        where: {
          user_id: userId,
          tanggal: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: ['category'],
      });

      const income = transactions
        .filter(t => t.tipe === 'income')
        .reduce((sum, t) => sum + parseFloat(t.jumlah), 0);

      const expense = transactions
        .filter(t => t.tipe === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.jumlah), 0);

      const byCategory = {};
      transactions.forEach(t => {
        const categoryName = t.category.nama_kategori;
        if (!byCategory[categoryName]) {
          byCategory[categoryName] = { income: 0, expense: 0 };
        }
        if (t.tipe === 'income') {
          byCategory[categoryName].income += parseFloat(t.jumlah);
        } else {
          byCategory[categoryName].expense += parseFloat(t.jumlah);
        }
      });

      return {
        success: true,
        period: `${month}/${year}`,
        summary: {
          income,
          expense,
          net: income - expense,
          byCategory,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  static async getYearlySummary(userId, year) {
    try {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);

      const transactions = await Transaction.findAll({
        where: {
          user_id: userId,
          tanggal: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      const monthlyData = {};
      for (let month = 1; month <= 12; month++) {
        monthlyData[month] = { income: 0, expense: 0 };
      }

      transactions.forEach(t => {
        const month = t.tanggal.getMonth() + 1;
        if (t.tipe === 'income') {
          monthlyData[month].income += parseFloat(t.jumlah);
        } else {
          monthlyData[month].expense += parseFloat(t.jumlah);
        }
      });

      return {
        success: true,
        year,
        monthlyData,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getAssetSummary(userId) {
    try {
      const assets = await Asset.findAll({
        where: { user_id: userId },
      });

      const totalBalance = assets.reduce((sum, a) => sum + parseFloat(a.saldo), 0);

      return {
        success: true,
        assets,
        totalBalance,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ReportService;
