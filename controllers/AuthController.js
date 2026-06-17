const AuthService = require('../services/AuthService');
const { body } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password, confirmPassword } = req.body;
      const result = await AuthService.register(username, email, password);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.cookie('x-access-token', result.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const result = await AuthService.getUserProfile(req.userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

// Validation rules
AuthController.registerValidation = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username minimal 3 karakter'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  validationMiddleware,
];

AuthController.loginValidation = [
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').notEmpty().withMessage('Password tidak boleh kosong'),
  validationMiddleware,
];

module.exports = AuthController;
