export const formatCurrency = (amount, currency = 'IDR') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat('id-ID', defaultOptions).format(new Date(date));
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number);
};

export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const getStatusColor = (status) => {
  const statusColors = {
    'Pending': '#fbbf24',
    'Processing': '#3b82f6',
    'Delivered': '#10b981',
    'Cancelled': '#ef4444'
  };
  return statusColors[status] || '#6b7280';
};

export const getCategoryIcon = (category) => {
  const categoryIcons = {
    'Milk': '🥛',
    'Yogurt': '🍦',
    'Cheese': '🧀',
    'Butter': '🧈'
  };
  return categoryIcons[category] || '📦';
};