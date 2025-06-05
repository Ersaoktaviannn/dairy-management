export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me'
  },
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products',
    UPDATE: '/products',
    DELETE: '/products',
    LOW_STOCK: '/products/low-stock'
  },
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    UPDATE: '/orders',
    DELETE: '/orders'
  },
  DASHBOARD: {
    STATS: '/dashboard/stats'
  }
};

export const PRODUCT_CATEGORIES = [
  'All',
  'Milk',
  'Yogurt', 
  'Cheese',
  'Butter'
];

export const ORDER_STATUSES = [
  'Pending',
  'Processing',
  'Delivered',
  'Cancelled'
];

export const PAGINATION_LIMITS = [10, 25, 50, 100];

export const MESSAGES = {
  SUCCESS: {
    PRODUCT_CREATED: 'Product created successfully',
    PRODUCT_UPDATED: 'Product updated successfully',
    PRODUCT_DELETED: 'Product deleted successfully',
    LOGIN_SUCCESS: 'Login successful'
  },
  ERROR: {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'Please login to continue',
    VALIDATION_ERROR: 'Please check your input and try again',
    SERVER_ERROR: 'Server error. Please try again later.'
  }
};