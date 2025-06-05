const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import modules
const database = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { authenticateToken } = require('./middleware/auth');

// Import models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Import utils
const ApiResponse = require('./utils/response');
const { schemas, validate } = require('./utils/validation');

const app = express();

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later.'
    }
  }
});
app.use('/api/', limiter);

// =============== ROUTES ===============

// Health check
app.get('/api/health', (req, res) => {
  ApiResponse.success(res, {
    message: 'Dairy Management API is running',
    timestamp: new Date().toISOString(),
    database: 'connected',
    version: '1.0.0'
  });
});

// Auth routes
app.post('/api/auth/login', validate(schemas.login), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return ApiResponse.error(res, {
        code: 'UNAUTHORIZED',
        message: 'Invalid credentials'
      }, 401);
    }

    // Demo fallback for admin user
    let validPassword = false;
    if (password === 'admin123' && user.email === 'admin@greenfields.com') {
      validPassword = true;
    } else {
      validPassword = await User.verifyPassword(password, user.password_hash);
    }

    if (!validPassword) {
      return ApiResponse.error(res, {
        code: 'UNAUTHORIZED',
        message: 'Invalid credentials'
      }, 401);
    }

    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'dairy_secret_key',
      { expiresIn: '24h' }
    );

    await User.updateLastLogin(user.id);

    ApiResponse.success(res, {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
});

// Product routes
app.get('/api/products', async (req, res, next) => {
  try {
    const result = await Product.findAll(req.query);
    ApiResponse.paginated(res, result.products, result.pagination);
  } catch (error) {
    next(error);
  }
});

app.get('/api/products/low-stock', async (req, res, next) => {
  try {
    const products = await Product.findLowStock();
    ApiResponse.success(res, products);
  } catch (error) {
    next(error);
  }
});

app.get('/api/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return ApiResponse.error(res, {
        code: 'NOT_FOUND',
        message: 'Product not found'
      }, 404);
    }
    ApiResponse.success(res, product);
  } catch (error) {
    next(error);
  }
});

app.post('/api/products', authenticateToken, validate(schemas.product), async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    ApiResponse.created(res, product, 'Product created successfully');
  } catch (error) {
    next(error);
  }
});

app.put('/api/products/:id', authenticateToken, validate(schemas.updateProduct), async (req, res, next) => {
  try {
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return ApiResponse.error(res, {
        code: 'NOT_FOUND',
        message: 'Product not found'
      }, 404);
    }

    const product = await Product.update(req.params.id, req.body);
    ApiResponse.success(res, product, 'Product updated successfully');
  } catch (error) {
    next(error);
  }
});

app.delete('/api/products/:id', authenticateToken, async (req, res, next) => {
  try {
    const deleted = await Product.delete(req.params.id);
    if (!deleted) {
      return ApiResponse.error(res, {
        code: 'NOT_FOUND',
        message: 'Product not found'
      }, 404);
    }
    ApiResponse.success(res, null, 'Product deleted successfully');
  } catch (error) {
    next(error);
  }
});

// Order routes
app.get('/api/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll(req.query);
    ApiResponse.success(res, orders);
  } catch (error) {
    next(error);
  }
});

app.get('/api/orders/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return ApiResponse.error(res, {
        code: 'NOT_FOUND',
        message: 'Order not found'
      }, 404);
    }
    ApiResponse.success(res, order);
  } catch (error) {
    next(error);
  }
});

// Dashboard routes
app.get('/api/dashboard/stats', async (req, res, next) => {
  try {
    const [
      totalProducts,
      totalOrders,
      totalRevenue,
      lowStockCount,
      recentOrders
    ] = await Promise.all([
      Product.getCount(),
      Order.getCount(),
      Order.getTotalRevenue(),
      Product.getLowStockCount(),
      Order.getRecent()
    ]);

    const stats = {
      total_products: totalProducts,
      total_orders: totalOrders,
      total_revenue: totalRevenue,
      low_stock_count: lowStockCount,
      recent_orders: recentOrders
    };

    ApiResponse.success(res, stats);
  } catch (error) {
    next(error);
  }
});

// Error handling
app.use('*', notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await database.connect();
    
    app.listen(PORT, () => {
      console.log('🚀 =========================================');
      console.log(`🚀 Dairy Management API Server`);
      console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🚀 Port: ${PORT}`);
      console.log(`🚀 URL: http://localhost:${PORT}`);
      console.log(`🚀 Health: http://localhost:${PORT}/api/health`);
      console.log('🚀 =========================================');
      console.log('');
      console.log('📋 API Endpoints:');
      console.log('   🔐 POST /api/auth/login');
      console.log('   📦 GET  /api/products');
      console.log('   📦 POST /api/products');
      console.log('   📦 PUT  /api/products/:id');
      console.log('   📦 DELETE /api/products/:id');
      console.log('   🛒 GET  /api/orders');
      console.log('   📊 GET  /api/dashboard/stats');
      console.log('');
      console.log('🔑 Demo Credentials:');
      console.log('   📧 Email: admin@greenfields.com');
      console.log('   🔒 Password: admin123');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  await database.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  await database.close();
  process.exit(0);
});

startServer();

module.exports = app;