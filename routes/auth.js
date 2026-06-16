const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Public routes
router.post('/register', AuthController.registerValidation, (req, res, next) => {
  AuthController.register(req, res, next);
});

router.post('/login', AuthController.loginValidation, (req, res, next) => {
  AuthController.login(req, res, next);
});

// Protected routes
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware, (req, res, next) => {
  AuthController.getProfile(req, res, next);
});

module.exports = router;
