import supabase from '../supabase.js';

export const getAddresses = async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const addAddress = async (req, res) => {
  const address = req.body;
  const { data, error } = await supabase.from('addresses').insert([address]).select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};

export const deleteAddress = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('addresses').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
};
