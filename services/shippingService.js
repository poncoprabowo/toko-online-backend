const axios = require('axios');
const config = require('../config');

const rajaongkirApiUrl = {
  starter: 'https://api.rajaongkir.com/starter', 
  basic: 'https://api.rajaongkir.com/basic', 
  pro: 'https://pro.rajaongkir.com/api' 
};

const baseURL = rajaongkirApiUrl[config.rajaongkirAccountType];

const apiClient = axios.create({
  baseURL,
  headers: {
    key: config.rajaongkirApiKey,
    'content-type': 'application/x-www-form-urlencoded'
  }
});

// Fungsi untuk ambil daftar provinsi
async function getProvinces() {
  const res = await apiClient.get('/province');
  return res.data.rajaongkir.results;
}

// Fungsi untuk ambil kota berdasarkan provinsi
async function getCities(provinceId) {
  const res = await apiClient.get(`/city?province=${provinceId}`);
  return res.data.rajaongkir.results;
}

// Fungsi untuk hitung ongkir
async function calculateShippingCost(origin, destination, weight, courier) {
  const res = await apiClient.post('/cost', {
    origin,
    originType: 'city',
    destination,
    destinationType: 'city',
    weight,
    courier
  });

  return res.data.rajaongkir.results[0].costs;
}

module.exports = {
  getProvinces,
  getCities,
  calculateShippingCost
};