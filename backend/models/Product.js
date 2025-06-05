const database = require('../config/database');

class Product {
  static async findAll(filters = {}) {
    try {
      const db = database.getConnection();
      const { category, search, page = 1, limit = 50 } = filters;
      const offset = (page - 1) * limit;

      let query = 'SELECT * FROM products WHERE 1=1';
      let params = [];

      if (category && category !== 'All') {
        query += ' AND category = ?';
        params.push(category);
      }

      if (search) {
        query += ' AND name LIKE ?';
        params.push(`%${search}%`);
      }

      // Get total count
      const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
      const [countResult] = await db.execute(countQuery, params);
      const total = countResult[0].total;

      // Add pagination
      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));

      const [products] = await db.execute(query, params);

      return {
        products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error finding products:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const db = database.getConnection();
      const [products] = await db.execute(
        'SELECT * FROM products WHERE id = ?', 
        [id]
      );
      return products[0] || null;
    } catch (error) {
      console.error('Error finding product by ID:', error);
      throw error;
    }
  }

  static async create(productData) {
    try {
      const db = database.getConnection();
      const { name, category, price, stock, expiry_date } = productData;

      const [result] = await db.execute(
        'INSERT INTO products (name, category, price, stock, expiry_date) VALUES (?, ?, ?, ?, ?)',
        [name, category, price, stock, expiry_date || null]
      );

      return this.findById(result.insertId);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  static async update(id, productData) {
    try {
      const db = database.getConnection();
      const { name, category, price, stock, expiry_date } = productData;

      await db.execute(
        'UPDATE products SET name = ?, category = ?, price = ?, stock = ?, expiry_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, category, price, stock, expiry_date || null, id]
      );

      return this.findById(id);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const db = database.getConnection();
      const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  static async findLowStock(threshold = 50) {
    try {
      const db = database.getConnection();
      const [products] = await db.execute(
        'SELECT * FROM products WHERE stock < ? ORDER BY stock ASC',
        [threshold]
      );
      return products;
    } catch (error) {
      console.error('Error finding low stock products:', error);
      throw error;
    }
  }

  static async getCount() {
    try {
      const db = database.getConnection();
      const [result] = await db.execute('SELECT COUNT(*) as count FROM products');
      return result[0].count;
    } catch (error) {
      console.error('Error getting product count:', error);
      throw error;
    }
  }

  static async getLowStockCount(threshold = 50) {
    try {
      const db = database.getConnection();
      const [result] = await db.execute(
        'SELECT COUNT(*) as count FROM products WHERE stock < ?', 
        [threshold]
      );
      return result[0].count;
    } catch (error) {
      console.error('Error getting low stock count:', error);
      throw error;
    }
  }
}

module.exports = Product;