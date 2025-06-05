const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const { app, httpServer } = require('./server');
const swaggerDocument = require('./swagger/swagger.json');

// Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const profileRoutes = require('./routes/profileRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const discountAdminRoutes = require('./routes/admin/discountAdminRoutes');
const campaignAdminRoutes = require('./routes/admin/campaignAdminRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Socket.IO
const { setupSocketIO } = require('./socket/socketHandler');
const io = require('socket.io')(httpServer);
setupSocketIO(io);

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/admin/discounts', discountAdminRoutes);
app.use('/api/admin/campaigns', campaignAdminRoutes);
app.use('/api', reviewRoutes);
app.use('/api', chatRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Toko Online Backend Berjalan!',
    docs: '/api-docs',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🟢 Server running on http://localhost:${PORT}`);
});