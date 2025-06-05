const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const productRoutes = require('./products');
const orderRoutes = require('./orders');
const dashboardRoutes = require('./dashboard');

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Dairy Management API is running',
    timestamp: new Date().toISOString(),
    database: 'connected',
    version: '1.0.0'
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;