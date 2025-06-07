import supabase from '../supabase.js';

export const getCartItems = async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const addCartItem = async (req, res) => {
  const item = req.body;
  const { data, error } = await supabase.from('cart_items').insert([item]).select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};

export const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('cart_items').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
};
