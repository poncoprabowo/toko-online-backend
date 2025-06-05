const cloudinary = require('../config/cloudinaryConfig');

exports.uploadImageToCloudinary = async (req, res) => {
  try {
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'toko-online/products'
    });

    res.json({
      success: true,
      message: 'Upload berhasil',
      data: {
        url: result.secure_url,
        public_id: result.public_id
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Upload gagal'
    });
  }
};