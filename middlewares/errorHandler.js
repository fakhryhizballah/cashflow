const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: 'Validasi data gagal',
      errors: err.errors.map(e => ({ field: e.path, msg: e.message })),
    });
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      message: 'Data sudah terdaftar',
      errors: err.errors.map(e => ({ field: e.path, msg: e.message })),
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
