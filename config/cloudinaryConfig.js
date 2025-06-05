const cloudinary = require('cloudinary').v2;
const config = require('./index');

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
  secure: true,
});

module.exports = cloudinary;