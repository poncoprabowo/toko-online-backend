// config/supabaseClient.js

const { createClient } = require('@supabase/supabase-js');
const config = require('./index');

const supabase = createClient(
  config.supabaseUrl,
  config.supabaseAnonKey
);

// Fungsi untuk mendapatkan user yang login via Supabase Auth
async function getUserFromRequest(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  const { user, error } = await supabase.auth.getUser(token);
  if (error) throw error;

  return user;
}

module.exports = { supabase, getUserFromRequest };