const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: { 
          code: 'UNAUTHORIZED', 
          message: 'Access token required' 
        }
      });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'dairy_secret_key', (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: { 
            code: 'FORBIDDEN', 
            message: 'Invalid or expired token' 
          }
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { 
        code: 'INTERNAL_ERROR', 
        message: 'Authentication error' 
      }
    });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { 
          code: 'UNAUTHORIZED', 
          message: 'Authentication required' 
        }
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: { 
          code: 'FORBIDDEN', 
          message: 'Insufficient permissions' 
        }
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  authorize
};