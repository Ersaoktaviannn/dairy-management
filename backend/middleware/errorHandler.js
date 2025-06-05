const errorHandler = (err, req, res, next) => {
  console.error('❌ Server Error:', err);

  // Default error
  let error = {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong!'
  };

  // Validation errors (Joi)
  if (err.isJoi) {
    error.code = 'VALIDATION_ERROR';
    error.message = err.details[0].message;
    return res.status(400).json({ success: false, error });
  }

  // Database errors
  if (err.code === 'ER_DUP_ENTRY') {
    error.code = 'DUPLICATE_ENTRY';
    error.message = 'Resource already exists';
    return res.status(409).json({ success: false, error });
  }

  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    error.code = 'REFERENCE_ERROR';
    error.message = 'Referenced resource not found';
    return res.status(400).json({ success: false, error });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.code = 'INVALID_TOKEN';
    error.message = 'Invalid token';
    return res.status(401).json({ success: false, error });
  }

  // Default server error
  res.status(500).json({ success: false, error });
};

const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: { 
      code: 'NOT_FOUND', 
      message: `Endpoint ${req.method} ${req.path} not found` 
    }
  });
};

module.exports = {
  errorHandler,
  notFound
};