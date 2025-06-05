class ApiResponse {
  static success(res, data = null, message = null, statusCode = 200) {
    const response = { success: true };
    
    if (message) response.message = message;
    if (data !== null) response.data = data;

    return res.status(statusCode).json(response);
  }

  static error(res, error, statusCode = 400) {
    return res.status(statusCode).json({
      success: false,
      error: {
        code: error.code || 'ERROR',
        message: error.message || 'An error occurred'
      }
    });
  }

  static paginated(res, data, pagination, message = null) {
    const response = {
      success: true,
      data,
      pagination
    };

    if (message) response.message = message;

    return res.json(response);
  }

  static created(res, data, message = 'Resource created successfully') {
    return this.success(res, data, message, 201);
  }

  static noContent(res, message = 'Operation completed successfully') {
    return res.status(204).json({
      success: true,
      message
    });
  }
}

module.exports = ApiResponse;