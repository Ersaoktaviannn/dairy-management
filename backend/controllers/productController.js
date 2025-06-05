const Product = require('../models/Product');
const ApiResponse = require('../utils/response');
const { validateProduct } = require('../utils/validation');

class ProductController {
  static async index(req, res, next) {
    try {
      const result = await Product.findAll(req.query);
      return ApiResponse.paginated(res, result.products, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return ApiResponse.error(res, {
          code: 'NOT_FOUND',
          message: 'Product not found'
        }, 404);
      }

      return ApiResponse.success(res, product);
    } catch (error) {
      next(error);
    }
  }

  static async store(req, res, next) {
    try {
      // Validate input
      const { error } = validateProduct(req.body);
      if (error) {
        return ApiResponse.error(res, {
          code: 'VALIDATION_ERROR',
          message: error.details[0].message
        }, 400);
      }

      const product = await Product.create(req.body);
      return ApiResponse.success(res, product, 'Product created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      // Check if product exists
      const existingProduct = await Product.findById(req.params.id);
      if (!existingProduct) {
        return ApiResponse.error(res, {
          code: 'NOT_FOUND',
          message: 'Product not found'
        }, 404);
      }

      // Validate input
      const { error } = validateProduct(req.body);
      if (error) {
        return ApiResponse.error(res, {
          code: 'VALIDATION_ERROR',
          message: error.details[0].message
        }, 400);
      }

      const product = await Product.update(req.params.id, req.body);
      return ApiResponse.success(res, product, 'Product updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const deleted = await Product.delete(req.params.id);
      if (!deleted) {
        return ApiResponse.error(res, {
          code: 'NOT_FOUND',
          message: 'Product not found'
        }, 404);
      }

      return ApiResponse.success(res, null, 'Product deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  static async lowStock(req, res, next) {
    try {
      const products = await Product.findLowStock();
      return ApiResponse.success(res, products);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;