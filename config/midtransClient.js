const snap = require('midtrans-client');
const config = require('./index');

// Inisialisasi Snap client
let snapClient = new snap.Snap({
  isProduction: false, // Ganti jadi true jika production
  serverKey: config.midtransServerKey,
  clientKey: config.midtransClientKey
});

module.exports = snapClient;