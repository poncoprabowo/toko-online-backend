const { supabase } = require('../config/supabaseClient');
const { authenticate } = require('../middleware/authMiddleware');

// Ambil data profil pengguna
exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    // Ambil data dari Supabase Auth
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
    res.status(5