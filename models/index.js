const sequelize = require('../config/database');
const User = require('./User');
const Asset = require('./Asset');
const Category = require('./Category');
const Transaction = require('./Transaction');

// Define associations
User.hasMany(Asset, { foreignKey: 'user_id', as: 'assets' });
Asset.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Category, { foreignKey: 'user_id', as: 'categories' });
Category.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Transaction, { foreignKey: 'user_id', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

Asset.hasMany(Transaction, { foreignKey: 'asset_id', as: 'transactions' });
Transaction.belongsTo(Asset, { foreignKey: 'asset_id', as: 'asset' });

Category.hasMany(Transaction, { foreignKey: 'category_id', as: 'transactions' });
Transaction.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

module.exports = {
  sequelize,
  User,
  Asset,
  Category,
  Transaction,
};
