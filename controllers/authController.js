const { supabase } = require('../config/supabaseClient');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Registrasi Pengguna Baru
exports.register = async (req, res) => {
  const { email, password, full_name } = req.body;

  try {
    // 1. Register via Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name
        }
      }
    });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.json({
      success: true,
      message: 'Registrasi berhasil',
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Login Pengguna
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Login via Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const user = data.user;

    // 2. Generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullName: user.user_metadata.full_name
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.user_metadata.full_name,
        createdAt: user.created_at
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};