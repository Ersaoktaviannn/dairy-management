const database = require('../config/database');

class Order {
  static async findAll(filters = {}) {
    try {
      const db = database.getConnection();
      const { status, date_from, date_to, page = 1, limit = 50 } = filters;
      const offset = (page - 1) * limit;

      let query = `
        SELECT o.*, 
               GROUP_CONCAT(
                 CONCAT(p.name, ' x', oi.quantity) 
                 SEPARATOR ', '
               ) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE 1=1
      `;
      let params = [];

      if (status) {
        query += ' AND o.status = ?';
        params.push(status);
      }

      if (date_from) {
        query += ' AND o.order_date >= ?';
        params.push(date_from);
      }

      if (date_to) {
        query += ' AND o.order_date <= ?';
        params.push(date_to);
      }

      query += ' GROUP BY o.id ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));

      const [orders] = await db.execute(query, params);
      return orders;
    } catch (error) {
      console.error('Error finding orders:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const db = database.getConnection();
      const [orders] = await db.execute(`
        SELECT o.*
        FROM orders o
        WHERE o.id = ?
      `, [id]);
      
      if (!orders[0]) return null;

      // Get order items separately
      const [items] = await db.execute(`
        SELECT oi.*, p.name as product_name
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `, [id]);

      return {
        ...orders[0],
        items
      };
    } catch (error) {
      console.error('Error finding order by ID:', error);
      throw error;
    }
  }

  static async getCount() {
    try {
      const db = database.getConnection();
      const [result] = await db.execute('SELECT COUNT(*) as count FROM orders');
      return result[0].count;
    } catch (error) {
      console.error('Error getting order count:', error);
      throw error;
    }
  }

  static async getTotalRevenue() {
    try {
      const db = database.getConnection();
      const [result] = await db.execute(
        'SELECT SUM(total_amount) as total FROM orders WHERE status = "Delivered"'
      );
      return result[0].total || 0;
    } catch (error) {
      console.error('Error getting total revenue:', error);
      throw error;
    }
  }

  static async getRecent(limit = 5) {
    try {
      const db = database.getConnection();
      const [orders] = await db.execute(
        'SELECT * FROM orders ORDER BY created_at DESC LIMIT ?',
        [limit]
      );
      return orders;
    } catch (error) {
      console.error('Error getting recent orders:', error);
      throw error;
    }
  }
}

module.exports = Order;