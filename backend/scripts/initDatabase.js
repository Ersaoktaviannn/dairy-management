const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
};

async function initDatabase() {
  let connection;
  
  try {
    console.log('🔧 Initializing Database...');
    console.log('===============================');

    // Connect to MySQL (without specific database)
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL server');

    // Create database if not exists
    const dbName = process.env.DB_NAME || 'dairy_management';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`✅ Database '${dbName}' created/verified`);

    // Use the database
    await connection.execute(`USE ${dbName}`);

    // Create users table
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'staff', 'viewer') DEFAULT 'staff',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await connection.execute(createUsersTable);
    console.log('✅ Users table created/verified');

    // Create products table
    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        category ENUM('Milk', 'Yogurt', 'Cheese', 'Butter') NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        expiry_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await connection.execute(createProductsTable);
    console.log('✅ Products table created/verified');

    // Create orders table
    const createOrdersTable = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        customer_name VARCHAR(255) NOT NULL,
        total_amount DECIMAL(12,2) NOT NULL,
        status ENUM('Pending', 'Processing', 'Delivered', 'Cancelled') DEFAULT 'Pending',
        order_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await connection.execute(createOrdersTable);
    console.log('✅ Orders table created/verified');

    // Create order_items table
    const createOrderItemsTable = `
      CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id INT,
        product_id INT,
        quantity INT NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        subtotal DECIMAL(12,2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `;
    await connection.execute(createOrderItemsTable);
    console.log('✅ Order items table created/verified');

    // Check if admin user exists
    const [adminUsers] = await connection.execute('SELECT COUNT(*) as count FROM users WHERE email = ?', ['admin@greenfields.com']);
    
    if (adminUsers[0].count === 0) {
      // Create admin user with hashed password
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await connection.execute(
        'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@greenfields.com', hashedPassword, 'admin']
      );
      console.log('✅ Admin user created (admin@greenfields.com / admin123)');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Check if sample products exist
    const [productCount] = await connection.execute('SELECT COUNT(*) as count FROM products');
    
    if (productCount[0].count === 0) {
      // Insert sample products
      const sampleProducts = [
        ['Fresh Milk 1L', 'Milk', 15000, 150, '2025-06-10'],
        ['Yogurt Strawberry', 'Yogurt', 8000, 75, '2025-06-08'],
        ['Cheese Block 200g', 'Cheese', 25000, 40, '2025-06-15'],
        ['Butter 250g', 'Butter', 18000, 60, '2025-06-12'],
        ['Yogurt Vanilla', 'Yogurt', 8500, 45, '2025-06-09'],
        ['Fresh Milk 500ml', 'Milk', 8000, 200, '2025-06-11'],
        ['Mozzarella Cheese 150g', 'Cheese', 22000, 30, '2025-06-14'],
        ['Greek Yogurt Plain', 'Yogurt', 12000, 25, '2025-06-07']
      ];

      for (const product of sampleProducts) {
        await connection.execute(
          'INSERT INTO products (name, category, price, stock, expiry_date) VALUES (?, ?, ?, ?, ?)',
          product
        );
      }
      console.log('✅ Sample products inserted');
    } else {
      console.log('✅ Products already exist');
    }

    // Check if sample orders exist
    const [orderCount] = await connection.execute('SELECT COUNT(*) as count FROM orders');
    
    if (orderCount[0].count === 0) {
      // Insert sample orders
      const sampleOrders = [
        ['Toko Sari Rasa', 190000, 'Delivered', '2025-06-01'],
        ['Supermarket Maju', 416000, 'Processing', '2025-06-02'],
        ['Cafe Kopi Nikmat', 225000, 'Pending', '2025-06-03'],
        ['Warung Bu Tini', 120000, 'Delivered', '2025-05-30'],
        ['Minimarket 24', 350000, 'Processing', '2025-06-04']
      ];

      for (const order of sampleOrders) {
        await connection.execute(
          'INSERT INTO orders (customer_name, total_amount, status, order_date) VALUES (?, ?, ?, ?)',
          order
        );
      }

      // Insert sample order items
      const orderItems = [
        // Order 1: Toko Sari Rasa
        [1, 1, 10, 15000, 150000], // Fresh Milk 1L x10
        [1, 2, 5, 8000, 40000],    // Yogurt Strawberry x5
        
        // Order 2: Supermarket Maju
        [2, 3, 8, 25000, 200000],  // Cheese Block x8
        [2, 4, 12, 18000, 216000], // Butter x12
        
        // Order 3: Cafe Kopi Nikmat
        [3, 1, 15, 15000, 225000], // Fresh Milk 1L x15
        
        // Order 4: Warung Bu Tini
        [4, 6, 15, 8000, 120000],  // Fresh Milk 500ml x15
        
        // Order 5: Minimarket 24
        [5, 1, 10, 15000, 150000], // Fresh Milk 1L x10
        [5, 3, 8, 25000, 200000]   // Cheese Block x8
      ];

      for (const item of orderItems) {
        await connection.execute(
          'INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)',
          item
        );
      }
      console.log('✅ Sample orders and order items inserted');
    } else {
      console.log('✅ Orders already exist');
    }

    console.log('');
    console.log('🎉 Database initialization completed successfully!');
    console.log('');
    console.log('📋 Summary:');
    console.log(`   - Database: ${dbName}`);
    console.log('   - Tables: users, products, orders, order_items');
    console.log('   - Admin user: admin@greenfields.com / admin123');
    console.log('   - Sample data: Products and orders inserted');
    console.log('');
    console.log('🚀 You can now start the server with: npm run dev');
    console.log('');
    console.log('📊 Data Summary:');
    
    // Show data summary
    const [productSummary] = await connection.execute('SELECT COUNT(*) as count FROM products');
    const [orderSummary] = await connection.execute('SELECT COUNT(*) as count FROM orders');
    const [userSummary] = await connection.execute('SELECT COUNT(*) as count FROM users');
    
    console.log(`   - Users: ${userSummary[0].count}`);
    console.log(`   - Products: ${productSummary[0].count}`);
    console.log(`   - Orders: ${orderSummary[0].count}`);

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('   1. Make sure MySQL is running');
    console.log('   2. Check your .env file settings');
    console.log('   3. Verify MySQL credentials');
    console.log('   4. Ensure you have CREATE DATABASE privileges');
    console.log('');
    console.log('💡 Common solutions:');
    console.log('   - Windows: Start MySQL from Services');
    console.log('   - macOS: brew services start mysql');
    console.log('   - Linux: sudo systemctl start mysql');
    console.log('');
    console.log('📝 Check .env file format:');
    console.log('   DB_HOST=localhost');
    console.log('   DB_USER=root');
    console.log('   DB_PASSWORD=your_password');
    console.log('   DB_NAME=dairy_management');
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run if called directly
if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase;