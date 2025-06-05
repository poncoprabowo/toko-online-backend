const { supabase } = require('../config/supabaseClient');
const { authenticate } = require('../middleware/authMiddleware');

// Lihat semua item di keranjang
exports.getCartItems = async (req, res) => {
  const userId = req.user.id;

  try {
    const { data, error } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Tambah item ke keranjang
exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { product_id, name, price, quantity, image_url } = req.body;

  try {
    // Cek apakah produk sudah ada di cart
    const { data, error: checkError } = await supabase
      .from('carts')
      .select()
      .eq('user_id', userId)
      .eq('product_id', product_id);

    if (checkError) throw checkError;

    if (data.length > 0) {
      // Update jumlah jika sudah ada
      const newQty = data[0].quantity + quantity;

      const { error } = await supabase
        .from('carts')
        .update({ quantity: newQty })
        .eq('id', data[0].id);

      if (error) throw error;

      return res.json({
        success: true,
        message: 'Jumlah produk diperbarui'
      });
    }

    // Jika belum ada, tambahkan baru
    const { error } = await supabase
      .from('carts')
      .insert([
        {
          user_id: userId,
          product_id,
          name,
          price,
          quantity,
          image_url
        }
      ]);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Produk berhasil ditambahkan ke keranjang'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Hapus item dari keranjang
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.params;

  try {
    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', product_id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Produk berhasil dihapus dari keranjang'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update jumlah item di keranjang
exports.updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.params;
  const { quantity } = req.body;

  try {
    const { error } = await supabase
      .from('carts')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', product_id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Jumlah produk diperbarui'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};