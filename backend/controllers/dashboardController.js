const Product = require('../models/Product');
const Order = require('../models/Order');
const ApiResponse = require('../utils/response');

class DashboardController {
  static async getStats(req, res, next) {
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

      return ApiResponse.success(res, stats);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DashboardController;