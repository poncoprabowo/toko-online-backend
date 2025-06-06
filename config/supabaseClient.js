// config/supabaseClient.js

const { createClient } = require('@supabase/supabase-js');
const config = require('./index');

// Validasi dulu apakah env variable tersedia
if (!config.supabaseUrl || !config.supabaseAnonKey) {
  throw new Error('SUPABASE_URL atau SUPABASE_ANON_KEY tidak ditemukan di .env');
}

// Inisialisasi Supabase client
const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

// Fungsi helper untuk mendapatkan user dari request
async function getUserFromRequest(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw error;

    return data.user;
  } catch (err) {
    throw err;
  }
}

module.exports = { supabase, getUserFromRequest };