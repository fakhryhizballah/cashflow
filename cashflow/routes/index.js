// Main router for API endpoints
const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.json({ message: 'Cashflow API is running' });
});

module.exports = router;