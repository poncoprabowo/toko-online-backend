const { supabase } = require('../../config/supabaseClient');

// Lihat semua diskon
exports.getAllDiscounts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('discounts')
      .select(`*, products(name)`)
      .eq('is_active', true);

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Tambah diskon baru
exports.createDiscount = async (req, res) => {
  const { product_id, discount_type, value, start_date, end_date } = req.body;

  try {
    const { data, error } = await supabase
      .from('discounts')
      .insert([
        {
          product_id,
          discount_type,
          value,
          start_date,
          end_date
        }
      ]);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Diskon berhasil ditambahkan',
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update diskon
exports.updateDiscount = async (req, res) => {
  const discountId = req.params.id;
  const { product_id, discount_type, value, start_date, end_date } = req.body;

  try {
    const updateData = {
      product_id,
      discount_type,
      value,
      start_date,
      end_date
    };

    const { data, error } = await supabase
      .from('discounts')
      .update(updateData)
      .eq('id', discountId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Diskon berhasil diperbarui'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Hapus diskon
exports.deleteDiscount = async (req, res) => {
  const discountId = req.params.id;

  try {
    const { error } = await supabase
      .from('discounts')
      .delete()
      .eq('id', discountId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Diskon berhasil dihapus'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};