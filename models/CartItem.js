const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: String,
  name: String,
  quantity: Number,
  price: Number
});

module.exports = mongoose.model('CartItem', cartItemSchema);