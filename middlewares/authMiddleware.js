const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies['x-access-token'];
  if (!token) {
    return res.redirect('/login');
    return res.status(401).json({ error: 'Token tidak ditemukan. Silakan login terlebih dahulu.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token telah kadaluarsa. Silakan login kembali.' });
    }
    res.clearCookie('x-access-token');
    return res.redirect('/login');
  }
};

module.exports = authMiddleware;
