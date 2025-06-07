import supabase from '../supabase.js';

export const getOrders = async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const createOrder = async (req, res) => {
  const order = req.body;
  const { data, error } = await supabase.from('orders').insert([order]).select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};
