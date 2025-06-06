// controllers/productController.js

const { supabase } = require('../config/supabaseClient');

// Fungsi getAllProducts harus async dan menerima req & res
exports.getAllProducts = async (req, res) => {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;

    return res.json({
      success: true,
      data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};