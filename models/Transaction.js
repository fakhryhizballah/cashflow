const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  asset_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'aset',
      key: 'id',
    },
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'kategori',
      key: 'id',
    },
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipe: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },
  jumlah: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  catatan: {
    type: DataTypes.TEXT,
  },
  is_recurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  recurring_type: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly'),
  },
  is_bookmarked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'transactions',
  timestamps: false,
});

module.exports = Transaction;
