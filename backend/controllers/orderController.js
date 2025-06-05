const Order = require('../models/Order');
const ApiResponse = require('../utils/response');

class OrderController {
  static async index(req, res, next) {
    try {
      const orders = await Order.findAll(req.query);
      return ApiResponse.success(res, orders);
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return ApiResponse.error(res, {
          code: 'NOT_FOUND',
          message: 'Order not found'
        }, 404);
      }

      return ApiResponse.success(res, order);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;