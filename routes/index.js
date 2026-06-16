const express = require('express');
const authRoutes = require('./auth');
const transactionRoutes = require('./transactions');
const assetRoutes = require('./assets');
const categoryRoutes = require('./categories');
const reportRoutes = require('./reports');

const router = express.Router();

// Main routes
router.use('/auth', authRoutes);
router.use('/transactions', transactionRoutes);
router.use('/assets', assetRoutes);
router.use('/categories', categoryRoutes);
router.use('/reports', reportRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running', timestamp: new Date() });
});

module.exports = router;