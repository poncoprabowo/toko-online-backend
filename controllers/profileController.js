// controllers/profileController.js

const { supabase } = require('../config/supabaseClient');

// Ambil data profil pengguna
exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const { data: user, error: authError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (authError) throw authError;

    res.json({
      success: true,
      data: {
        id: user.id,
        email: req.user.email,
        fullName: req.user.fullName,
        phone: user.phone || '',
        createdAt: req.user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update profil pengguna
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { fullName, phone } = req.body;

  try {
    // Update metadata di Supabase Auth
    const { error: authError } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    });

    if (authError) throw authError;

    // Update atau insert ke tabel users
    const { error: dbError } = await supabase
      .from('users')
      .upsert([
        {
          id: userId,
          phone
        }
      ]);

    if (dbError) throw dbError;

    res.json({
      success: true,
      message: 'Profil berhasil diperbarui'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Ambil semua alamat pengiriman
exports.getUserAddresses = async (req, res) => {
  const userId = req.user.id;

  try {
    const { data, error } = await supabase
      .from('user_addresses')
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

// Tambah alamat baru
exports.addUserAddress = async (req, res) => {
  const userId = req.user.id;
  const addressData = req.body;

  try {
    const { error } = await supabase
      .from('user_addresses')
      .insert([
        {
          user_id: userId,
          ...addressData
        }
      ]);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Alamat berhasil ditambahkan'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Hapus alamat
exports.deleteUserAddress = async (req, res) => {
  const { addressId } = req.params;

  try {
    const { error } = await supabase
      .from('user_addresses')
      .delete()
      .eq('id', addressId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Alamat berhasil dihapus'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Set alamat sebagai default
exports.setDefaultAddress = async (req, res) => {
  const userId = req.user.id;
  const { addressId } = req.body;

  try {
    // Reset semua alamat menjadi tidak default
    await supabase
      .from('user_addresses')
      .update({ is_default: false })
      .eq('user_id', userId);

    // Set alamat terpilih sebagai default
    const { error } = await supabase
      .from('user_addresses')
      .update({ is_default: true })
      .eq('id', addressId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Alamat utama berhasil diubah'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};