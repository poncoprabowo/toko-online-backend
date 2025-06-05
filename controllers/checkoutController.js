// controllers/checkoutController.js

exports.checkout = async (req, res) => {
  const userId = req.user.id;
  const { shippingAddress, courier, shippingCost } = req.body;

  try {
    // Ambil item dari keranjang
    const { data: cartItems, error: cartError } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', userId);

    if (cartError) throw cartError;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Keranjang kosong' });
    }

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const grandTotal = totalAmount + shippingCost;

    // Lanjutkan ke pembuatan order Midtrans
    res.json({
      success: true,
      data: {
        items: cartItems,
        totalAmount,
        shippingCost,
        grandTotal,
        shippingAddress,
        courier
      }
    });

    // Kosongkan keranjang setelah checkout
    await supabase
      .from('carts')
      .delete()
      .eq('user_id', userId);

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};