const { supabase } = require('../config/supabaseClient');

exports.isAdmin = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Cek apakah user adalah admin
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return res.status(403).json({
        success: false,
        message: 'Akses ditolak. Hanya untuk admin.'
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};