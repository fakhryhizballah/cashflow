const express = require('express');
const ReportController = require('../controllers/ReportController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Semua routes memerlukan auth
router.use(authMiddleware);

// Reports
router.get('/monthly/:year/:month', (req, res, next) => {
  ReportController.getMonthlySummary(req, res, next);
});

router.get('/yearly/:year', (req, res, next) => {
  ReportController.getYearlySummary(req, res, next);
});

router.get('/assets', (req, res, next) => {
  ReportController.getAssetSummary(req, res, next);
});

module.exports = router;
