const snap = require('../config/midtransClient');
const { supabase } = require('../config/supabaseClient');

exports.createPayment = async (req, res) => {
  const { user } = req; // dari middleware auth
  const { items, shippingAddress, totalAmount } = req.body;

  try {
    // Generate order ID unik
    const orderId = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Data transaksi untuk Midtrans
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: totalAmount
      },
      credit_card: {
        secure: true
      },
      customer_details: {
        first_name: user.fullName,
        email: user.email,
        phone: '08123456789',
        billing_address: {
          address: shippingAddress
        }
      },
      item_details: items.map(item => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name
      }))
    };

    // Membuat token pembayaran via Midtrans Snap API
    const paymentToken = await snap.createTransaction(parameter);

    // Simpan informasi pembayaran ke Supabase
    await supabase.from('orders').insert([
      {
        order_id: orderId,
        user_id: user.id,
        total_amount: totalAmount,
        payment_token: paymentToken.token,
        payment_url: paymentToken.redirect_url,
        status: 'pending',
        shipping_address: shippingAddress,
        items: items
      }
    ]);

    res.json({
      success: true,
      message: 'Pembayaran berhasil dibuat',
      data: {
        orderId,
        paymentUrl: paymentToken.redirect_url
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Gagal membuat pembayaran'
    });
  }
};

// Webhook handler untuk Midtrans callback
exports.handleWebhook = async (req, res) => {
  const notification = req.body;

  const orderId = notification.order_id;
  const statusCode = notification.status_code;
  const grossAmount = notification.gross_amount;

  try {
    if (notification.transaction_status === 'capture' || notification.transaction_status === 'settlement') {
      // Update status pesanan di Supabase menjadi sukses
      await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('order_id', orderId);
    } else if (notification.transaction_status === 'cancel' ||
               notification.transaction_status === 'deny' ||
               notification.transaction_status === 'expire') {
      // Update status pesanan menjadi expired / canceled
      await supabase
        .from('orders')
        .update({ status: 'expired' })
        .eq('order_id', orderId);
    }

    res.status(200).end();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};