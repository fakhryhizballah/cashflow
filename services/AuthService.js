const { User } = require('../models');
const { generateToken } = require('../config/jwt');

class AuthService {
  static async register(username, email, password) {
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
      return {
        success: true,
        message: 'Registrasi berhasil',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        }
      };
    } catch (error) {
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        const error = new Error('Email atau password salah');
        error.status = 401;
        throw error;
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        const error = new Error('Email atau password salah');
        error.status = 401;
        throw error;
      }

      const token = generateToken(user);
      return {
        success: true,
        message: 'Login berhasil',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getUserProfile(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        const error = new Error('User tidak ditemukan');
        error.status = 404;
        throw error;
      }

      return {
        success: true,
        user,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
