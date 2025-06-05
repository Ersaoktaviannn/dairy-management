const Joi = require('joi');

// Validation schemas
const schemas = {
  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required'
    })
  }),

  product: Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
      'string.min': 'Product name must be at least 3 characters',
      'string.max': 'Product name cannot exceed 255 characters',
      'any.required': 'Product name is required'
    }),
    category: Joi.string().valid('Milk', 'Yogurt', 'Cheese', 'Butter').required().messages({
      'any.only': 'Category must be one of: Milk, Yogurt, Cheese, Butter',
      'any.required': 'Category is required'
    }),
    price: Joi.number().positive().required().messages({
      'number.positive': 'Price must be a positive number',
      'any.required': 'Price is required'
    }),
    stock: Joi.number().integer().min(0).required().messages({
      'number.integer': 'Stock must be a whole number',
      'number.min': 'Stock cannot be negative',
      'any.required': 'Stock is required'
    }),
    expiry_date: Joi.date().allow(null, '').messages({
      'date.base': 'Please provide a valid date'
    })
  }),

  updateProduct: Joi.object({
    name: Joi.string().min(3).max(255).messages({
      'string.min': 'Product name must be at least 3 characters',
      'string.max': 'Product name cannot exceed 255 characters'
    }),
    category: Joi.string().valid('Milk', 'Yogurt', 'Cheese', 'Butter').messages({
      'any.only': 'Category must be one of: Milk, Yogurt, Cheese, Butter'
    }),
    price: Joi.number().positive().messages({
      'number.positive': 'Price must be a positive number'
    }),
    stock: Joi.number().integer().min(0).messages({
      'number.integer': 'Stock must be a whole number',
      'number.min': 'Stock cannot be negative'
    }),
    expiry_date: Joi.date().allow(null, '').messages({
      'date.base': 'Please provide a valid date'
    })
  }).min(1)
};

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error.details[0].message
        }
      });
    }
    next();
  };
};

module.exports = {
  schemas,
  validate
};