// controllers/reviewController.js
const { supabase } = require('../config/supabaseClient');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

exports.createReview = async (req, res) => {
  const { product_id, rating, comment } = req.body;
  const userId = req.user.id;

  try {
    const { error } = await supabase.from('reviews').insert([
      { product_id, user_id: userId, rating, comment }
    ]);

    if (error) throw error;

    res.json({ success: true, message: 'Ulasan berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProductReviews = async (req, res) => {
  const productId = req.params.id;

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, users(full_name)')
      .eq('product_id', productId);

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteReviewByAdmin = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) throw error;

    res.json({ success: true, message: 'Ulasan berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};