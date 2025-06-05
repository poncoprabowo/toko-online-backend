const {
  getProvinces,
  getCities,
  calculateShippingCost
} = require('../services/shippingService');

// Ambil semua provinsi
exports.getProvinces = async (req, res) => {
  try {
    const provinces = await getProvinces();
    res.json({ success: true, data: provinces });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Ambil kota berdasarkan provinsi
exports.getCitiesByProvince = async (req, res) => {
  const { province_id } = req.params;

  try {
    const cities = await getCities(province_id);
    res.json({ success: true, data: cities });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Hitung ongkir
exports.calculateShipping = async (req, res) => {
  const { origin, destination, weight, courier } = req.body;

  if (!origin || !destination || !weight || !courier) {
    return res.status(400).json({ success: false, message: 'Semua parameter harus diisi' });
  }

  try {
    const costs = await calculateShippingCost(origin, destination, weight, courier);
    res.json({ success: true, data: costs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};