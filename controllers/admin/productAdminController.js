const { supabase } = require('../../config/supabaseClient');

// Lihat semua kategori
exports.getAllCategories = async (req, res) => {
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Tambah kategori
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const imageUrl = req.fileData?.url;

  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([
        {
          name,
          image_url: imageUrl
        }
      ]);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Kategori berhasil dibuat',
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update kategori
exports.updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  const imageUrl = req.fileData?.url;

  try {
    const updateData = { name };
    if (imageUrl) updateData.image_url = imageUrl;

    const { data, error } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', categoryId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Kategori berhasil diperbarui'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Hapus kategori
exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Kategori berhasil dihapus'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};