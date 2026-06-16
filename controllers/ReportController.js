const ReportService = require('../services/ReportService');

class ReportController {
  static async getMonthlySummary(req, res, next) {
    try {
      const { year, month } = req.params;
      const result = await ReportService.getMonthlySummary(req.userId, year, month);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getYearlySummary(req, res, next) {
    try {
      const { year } = req.params;
      const result = await ReportService.getYearlySummary(req.userId, year);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getAssetSummary(req, res, next) {
    try {
      const result = await ReportService.getAssetSummary(req.userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;
