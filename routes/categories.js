const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Semua routes memerlukan auth
router.use(authMiddleware);

// CRUD Categories
router.post('/', CategoryController.createValidation, (req, res, next) => {
  CategoryController.createCategory(req, res, next);
});

router.get('/', (req, res, next) => {
  CategoryController.getCategories(req, res, next);
});

router.get('/:id', (req, res, next) => {
  CategoryController.getCategoryById(req, res, next);
});

router.put('/:id', CategoryController.updateValidation, (req, res, next) => {
  CategoryController.updateCategory(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  CategoryController.deleteCategory(req, res, next);
});

module.exports = router;
