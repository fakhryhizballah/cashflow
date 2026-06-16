const express = require('express');
const AssetController = require('../controllers/AssetController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Semua routes memerlukan auth
router.use(authMiddleware);

// CRUD Assets
router.post('/', AssetController.createValidation, (req, res, next) => {
  AssetController.createAsset(req, res, next);
});

router.get('/', (req, res, next) => {
  AssetController.getAssets(req, res, next);
});

router.get('/:id', (req, res, next) => {
  AssetController.getAssetById(req, res, next);
});

router.put('/:id', AssetController.updateValidation, (req, res, next) => {
  AssetController.updateAsset(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  AssetController.deleteAsset(req, res, next);
});

module.exports = router;
