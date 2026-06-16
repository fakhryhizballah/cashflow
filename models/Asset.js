const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asset = sequelize.define('Asset', {
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
  nama_aset: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
    },
  },
  tipe_aset: {
    type: DataTypes.ENUM('bank', 'kartu_debit', 'kartu_kredit', 'dompet', 'investasi', 'lainnya'),
    allowNull: false,
    defaultValue: 'bank',
  },
  saldo: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  mata_uang: {
    type: DataTypes.STRING,
    defaultValue: 'IDR',
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
  tableName: 'aset',
  timestamps: false,
});

module.exports = Asset;
