import { supabase } from '../supabase.js';

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const registerUser = async (req, res) => {
  const { id, name, email, phone } = req.body;

  const { data, error } = await supabase
    .from('users')
    .insert([{ id, name, email, phone }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  const { data, error } = await supabase
    .from('users')
    .update({ name, phone })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};
