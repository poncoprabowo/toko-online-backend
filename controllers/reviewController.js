// controllers/reviewController.js

const { supabase } = require('../config/supabaseClient');

async function createReview(req, res) {
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
}

async function getProductReviews(req, res) {
  const productId = req.params.id;

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId);

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteReviewByAdmin(req, res) {
  const reviewId = req.params.id;

  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Ulasan berhasil dihapus'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  createReview,
  getProductReviews,
  deleteReviewByAdmin
};