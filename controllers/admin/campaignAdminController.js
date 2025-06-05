const { supabase } = require('../../config/supabaseClient');

// Lihat semua campaign
exports.getAllCampaigns = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('is_active', true);

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Tambah campaign baru
exports.createCampaign = async (req, res) => {
  const { title, description, start_date, end_date } = req.body;
  const imageUrl = req.fileData?.url;

  try {
    const { data, error } = await supabase
      .from('campaigns')
      .insert([
        {
          title,
          description,
          start_date,
          end_date,
          banner_url: imageUrl
        }
      ]);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Campaign berhasil dibuat',
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update campaign
exports.updateCampaign = async (req, res) => {
  const campaignId = req.params.id;
  const { title, description, start_date, end_date } = req.body;
  const imageUrl = req.fileData?.url;

  try {
    const updateData = {
      title,
      description,
      start_date,
      end_date
    };

    if (imageUrl) updateData.banner_url = imageUrl;

    const { data, error } = await supabase
      .from('campaigns')
      .update(updateData)
      .eq('id', campaignId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Campaign berhasil diperbarui'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Hapus campaign
exports.deleteCampaign = async (req, res) => {
  const campaignId = req.params.id;

  try {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', campaignId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Campaign berhasil dihapus'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};