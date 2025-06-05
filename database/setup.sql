-- 1. Buat database
CREATE DATABASE IF NOT EXISTS dairy_management;
USE dairy_management;

-- 2. Buat tabel users
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff', 'viewer') DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Buat tabel products
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category ENUM('Milk', 'Yogurt', 'Cheese', 'Butter') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Buat tabel orders
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(255) NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    status ENUM('Pending', 'Processing', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    order_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Buat tabel order_items
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 6. Insert admin user default
INSERT INTO users (username, email, password_hash, role) VALUES 
('admin', 'admin@greenfields.com', '$2b$10$rQZ9X8oQ8XqVhY9p1DqKzeZLJ8W3k3z8Q8Y8Z8Y8Z8Y8Z8Y8Z8Y8Z8', 'admin');

-- 7. Insert sample products
INSERT INTO products (name, category, price, stock, expiry_date) VALUES
('Fresh Milk 1L', 'Milk', 15000.00, 150, '2025-06-10'),
('Yogurt Strawberry', 'Yogurt', 8000.00, 75, '2025-06-08'),
('Cheese Block 200g', 'Cheese', 25000.00, 40, '2025-06-15'),
('Butter 250g', 'Butter', 18000.00, 60, '2025-06-12'),
('Yogurt Vanilla', 'Yogurt', 8500.00, 45, '2025-06-09'),
('Fresh Milk 500ml', 'Milk', 8000.00, 200, '2025-06-11');

-- 8. Insert sample orders
INSERT INTO orders (customer_name, total_amount, status, order_date) VALUES
('Toko Sari Rasa', 190000.00, 'Delivered', '2025-06-01'),
('Supermarket Maju', 416000.00, 'Processing', '2025-06-02'),
('Cafe Kopi Nikmat', 225000.00, 'Pending', '2025-06-03');

-- 9. Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES
-- Order 1: Toko Sari Rasa
(1, 1, 10, 15000.00, 150000.00),  -- Fresh Milk 1L x10
(1, 2, 5, 8000.00, 40000.00),     -- Yogurt Strawberry x5

-- Order 2: Supermarket Maju  
(2, 3, 8, 25000.00, 200000.00),   -- Cheese Block x8
(2, 4, 12, 18000.00, 216000.00),  -- Butter x12

-- Order 3: Cafe Kopi Nikmat
(3, 1, 15, 15000.00, 225000.00);  -- Fresh Milk 1L x15

-- 10. Tampilkan data untuk verifikasi
SELECT 'Users Table:' as info;
SELECT * FROM users;

SELECT 'Products Table:' as info;
SELECT * FROM products;

SELECT 'Orders Table:' as info;
SELECT * FROM orders;

SELECT 'Order Items Table:' as info;
SELECT * FROM order_items;