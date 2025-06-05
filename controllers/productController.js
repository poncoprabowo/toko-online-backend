// controllers/productController.js

exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (productError) throw productError;

    // Ambil diskon jika ada
    const { data: discount, error: discountError } = await supabase
      .from('discounts')
      .select('*')
      .eq('product_id', productId)
      .eq('is_active', true)
      .maybeSingle();

    let finalPrice = product.price;
    if (discount) {
      if (discount.discount_type === 'percentage') {
        finalPrice = Math.round(product.price * (1 - discount.value / 100));
      } else {
        finalPrice = product.price - discount.value;
      }
    }

    res.json({
      success: true,
      data: {
        ...product,
        discounted_price: finalPrice,
        discount
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};