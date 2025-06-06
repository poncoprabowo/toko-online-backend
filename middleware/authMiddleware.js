const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware untuk autentikasi token JWT
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak ditemukan atau tidak valid'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid'
    });
  }
};

// Middleware untuk memeriksa apakah user adalah admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Akses ditolak: hanya admin yang dapat melakukan aksi ini'
    });
  }
};
