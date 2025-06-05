const database = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async findByEmail(email) {
    try {
      const db = database.getConnection();
      const [users] = await db.execute(
        'SELECT * FROM users WHERE email = ?', 
        [email]
      );
      return users[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const db = database.getConnection();
      const [users] = await db.execute(
        'SELECT id, username, email, role, created_at FROM users WHERE id = ?', 
        [id]
      );
      return users[0] || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  static async create(userData) {
    try {
      const db = database.getConnection();
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const [result] = await db.execute(
        'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [userData.username, userData.email, hashedPassword, userData.role || 'staff']
      );

      return this.findById(result.insertId);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error('Error verifying password:', error);
      throw error;
    }
  }

  static async updateLastLogin(userId) {
    try {
      const db = database.getConnection();
      await db.execute(
        'UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [userId]
      );
    } catch (error) {
      console.error('Error updating last login:', error);
      // Don't throw error for this non-critical operation
    }
  }
}

module.exports = User;