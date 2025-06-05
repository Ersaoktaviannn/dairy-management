import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie } from 'recharts';
import './index.css';

// Animated Icons Component
const AnimatedIcons = {
  Package: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-bounce">📦</span>
    </div>
  ),
  ShoppingCart: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-bounce">🛒</span>
    </div>
  ),
  BarChart: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-pulse">📊</span>
    </div>
  ),
  Money: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-glow">💰</span>
    </div>
  ),
  Alert: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-shake">⚠️</span>
    </div>
  ),
  Plus: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-rotate">➕</span>
    </div>
  ),
  Edit: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-wiggle">✏️</span>
    </div>
  ),
  Trash: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-shake">🗑️</span>
    </div>
  ),
  Search: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-pulse">🔍</span>
    </div>
  ),
  Filter: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-bounce">🔽</span>
    </div>
  ),
  Check: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-pop">✅</span>
    </div>
  ),
  X: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-spin">❌</span>
    </div>
  ),
  Loading: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-spin">⭐</span>
    </div>
  ),
  Eye: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-pulse">👁️</span>
    </div>
  ),
  Download: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-bounce">📥</span>
    </div>
  ),
  Upload: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-bounce">📤</span>
    </div>
  ),
  Email: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-pulse">📧</span>
    </div>
  ),
  Theme: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-rotate">🎨</span>
    </div>
  ),
  Analytics: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-pulse">📈</span>
    </div>
  ),
  Settings: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-spin">⚙️</span>
    </div>
  ),
  Bell: ({ className = "" }) => (
    <div className={`animated-icon ${className}`}>
      <span className="icon-shake">🔔</span>
    </div>
  )
};

// Loading Component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner">
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
    <div className="loading-text">
      <span className="loading-dots">Loading</span>
    </div>
  </div>
);

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value) || 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span className="animated-counter">{count.toLocaleString()}</span>;
};

// Notification System
const NotificationSystem = ({ notifications, onRemove }) => (
  <div className="notification-container">
    {notifications.map(notification => (
      <div 
        key={notification.id}
        className={`notification notification-${notification.type} notification-enter`}
        onAnimationEnd={() => {
          setTimeout(() => onRemove(notification.id), 3000);
        }}
      >
        <div className="notification-icon">
          {notification.type === 'success' && <AnimatedIcons.Check />}
          {notification.type === 'error' && <AnimatedIcons.X />}
          {notification.type === 'info' && <AnimatedIcons.Bell />}
        </div>
        <div className="notification-content">
          <p className="notification-title">{notification.title}</p>
          <p className="notification-message">{notification.message}</p>
        </div>
        <button 
          onClick={() => onRemove(notification.id)}
          className="notification-close"
        >
          <AnimatedIcons.X />
        </button>
      </div>
    ))}
  </div>
);

// Progress Bar Component
const ProgressBar = ({ percentage, color = "blue", label }) => (
  <div className="progress-container">
    {label && <div className="progress-label">{label}</div>}
    <div className="progress-bar">
      <div 
        className={`progress-fill progress-${color}`}
        style={{ 
          width: `${percentage}%`,
          animation: `progressFill 1.5s ease-out`
        }}
      >
        <div className="progress-shine"></div>
      </div>
    </div>
    <div className="progress-percentage">{percentage}%</div>
  </div>
);

// Advanced Analytics Modal Component
const AdvancedAnalyticsModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const chartData = [
    { name: 'Jan', sales: 400000, orders: 45, profit: 150000 },
    { name: 'Feb', sales: 300000, orders: 38, profit: 120000 },
    { name: 'Mar', sales: 500000, orders: 62, profit: 200000 },
    { name: 'Apr', sales: 450000, orders: 55, profit: 180000 },
    { name: 'May', sales: 600000, orders: 72, profit: 240000 },
    { name: 'Jun', sales: 750000, orders: 89, profit: 300000 }
  ];

  const categoryData = [
    { name: 'Milk', value: 400, fill: '#4a90a4' },
    { name: 'Yogurt', value: 300, fill: '#ec4899' },
    { name: 'Cheese', value: 200, fill: '#d4af37' },
    { name: 'Butter', value: 100, fill: '#2d5a3d' }
  ];

  return (
    <div className="modal-overlay modal-enter" onClick={onClose}>
      <div className="modal-content modal-bounce analytics-modal-advanced" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📊 Analytics Dashboard</h3>
          <button onClick={onClose} className="modal-close">
            <AnimatedIcons.X />
          </button>
        </div>
        
        <div className="modal-body analytics-body">
          {/* Analytics Overview */}
          <div className="analytics-overview">
            <div className="analytics-cards">
              <div className="analytics-card">
                <AnimatedIcons.Money className="analytics-card-icon" />
                <div className="analytics-card-content">
                  <h4>Total Revenue</h4>
                  <p className="analytics-number">Rp 3.5M</p>
                  <span className="analytics-trend up">+15% from last month</span>
                </div>
              </div>
              <div className="analytics-card">
                <AnimatedIcons.ShoppingCart className="analytics-card-icon" />
                <div className="analytics-card-content">
                  <h4>Total Orders</h4>
                  <p className="analytics-number">361</p>
                  <span className="analytics-trend up">+8% from last month</span>
                </div>
              </div>
              <div className="analytics-card">
                <AnimatedIcons.Package className="analytics-card-icon" />
                <div className="analytics-card-content">
                  <h4>Products Sold</h4>
                  <p className="analytics-number">1,247</p>
                  <span className="analytics-trend up">+12% from last month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-container-large">
              <h4>📈 Sales & Revenue Trend</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'sales' ? `Rp ${value.toLocaleString()}` : value,
                    name === 'sales' ? 'Sales' : name === 'orders' ? 'Orders' : 'Profit'
                  ]} />
                  <Line type="monotone" dataKey="sales" stroke="#2d5a3d" strokeWidth={3} />
                  <Line type="monotone" dataKey="profit" stroke="#4a90a4" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="charts-grid">
              <div className="chart-container">
                <h4>📊 Monthly Orders</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#d4af37" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h4>🥛 Product Categories</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
          <button className="btn-primary">
            <AnimatedIcons.Download />
            <span>Export Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Email System Modal
const EmailModal = ({ isOpen, onClose, type = 'notification', recipient = '' }) => {
  const [emailData, setEmailData] = useState({
    to: recipient,
    subject: '',
    message: '',
    template: 'order_update'
  });
  const [sending, setSending] = useState(false);

  const templates = {
    order_update: {
      subject: 'Order Status Update',
      message: 'Your order has been updated. Please check your order details for more information.'
    },
    low_stock: {
      subject: 'Low Stock Alert',
      message: 'Some products are running low on stock. Please review and reorder as necessary.'
    },
    promotion: {
      subject: 'Special Promotion - Dairy Products',
      message: 'We have special offers on our premium dairy products. Check out our latest deals!'
    }
  };

  if (!isOpen) return null;

  const handleSendEmail = () => {
    setSending(true);
    // Simulate email sending
    setTimeout(() => {
      setSending(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay modal-enter" onClick={onClose}>
      <div className="modal-content modal-bounce email-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📧 Send Email</h3>
          <button onClick={onClose} className="modal-close">
            <AnimatedIcons.X />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label>Template</label>
            <div className="input-container">
              <select
                value={emailData.template}
                onChange={(e) => {
                  const template = templates[e.target.value];
                  setEmailData({
                    ...emailData,
                    template: e.target.value,
                    subject: template.subject,
                    message: template.message
                  });
                }}
                className="form-input"
              >
                <option value="order_update">Order Update</option>
                <option value="low_stock">Low Stock Alert</option>
                <option value="promotion">Promotion</option>
              </select>
              <div className="input-highlight"></div>
            </div>
          </div>

          <div className="form-group">
            <label>To</label>
            <div className="input-container">
              <input
                type="email"
                value={emailData.to}
                onChange={(e) => setEmailData({...emailData, to: e.target.value})}
                className="form-input"
                placeholder="customer@email.com"
              />
              <div className="input-highlight"></div>
            </div>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <div className="input-container">
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                className="form-input"
              />
              <div className="input-highlight"></div>
            </div>
          </div>

          <div className="form-group">
            <label>Message</label>
            <div className="input-container">
              <textarea
                value={emailData.message}
                onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                className="form-input email-textarea"
                rows="6"
              />
              <div className="input-highlight"></div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button 
            onClick={handleSendEmail} 
            className="btn-primary"
            disabled={sending}
          >
            {sending ? (
              <AnimatedIcons.Loading />
            ) : (
              <AnimatedIcons.Email />
            )}
            <span>{sending ? 'Sending...' : 'Send Email'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Excel Export/Import Modal
const ExcelModal = ({ isOpen, onClose, type = 'export', data = [] }) => {
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      setExporting(false);
      onClose();
    }, 2000);
  };

  const handleImport = () => {
    setImporting(true);
    // Simulate import process
    setTimeout(() => {
      setImporting(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay modal-enter" onClick={onClose}>
      <div className="modal-content modal-bounce excel-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📋 {type === 'export' ? 'Export to Excel' : 'Import from Excel'}</h3>
          <button onClick={onClose} className="modal-close">
            <AnimatedIcons.X />
          </button>
        </div>
        
        <div className="modal-body">
          {type === 'export' ? (
            <div className="export-options">
              <h4>Export Options</h4>
              <div className="export-checkboxes">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Include Product Details</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Include Stock Information</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Include Pricing</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Include Analytics Data</span>
                </label>
              </div>
              <div className="export-preview">
                <p>📊 Ready to export {data.length} records</p>
              </div>
            </div>
          ) : (
            <div className="import-options">
              <h4>Import from Excel</h4>
              <div className="file-upload-area">
                <AnimatedIcons.Upload className="upload-icon" />
                <p>Drag and drop your Excel file here</p>
                <p className="upload-subtitle">or</p>
                <button className="btn-upload">Choose File</button>
              </div>
              <div className="import-instructions">
                <h5>📋 Instructions:</h5>
                <ul>
                  <li>File must be in .xlsx or .xls format</li>
                  <li>First row should contain column headers</li>
                  <li>Required columns: Name, Category, Price, Stock</li>
                  <li>Maximum file size: 10MB</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button 
            onClick={type === 'export' ? handleExport : handleImport}
            className="btn-primary"
            disabled={exporting || importing}
          >
            {(exporting || importing) ? (
              <AnimatedIcons.Loading />
            ) : type === 'export' ? (
              <AnimatedIcons.Download />
            ) : (
              <AnimatedIcons.Upload />
            )}
            <span>
              {exporting ? 'Exporting...' : importing ? 'Importing...' : 
               type === 'export' ? 'Export Excel' : 'Import Excel'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Theme Switcher Component
const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { id: 'natural', name: 'Natural', color: '#2d5a3d' },
    { id: 'dark', name: 'Dark', color: '#1a1a1a' },
    { id: 'blue', name: 'Ocean', color: '#0ea5e9' },
    { id: 'purple', name: 'Purple', color: '#8b5cf6' }
  ];

  return (
    <div className="theme-switcher">
      <div className="theme-label">
        <AnimatedIcons.Theme />
        <span>Theme</span>
      </div>
      <div className="theme-options">
        {themes.map(theme => (
          <button
            key={theme.id}
            className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
            onClick={() => onThemeChange(theme.id)}
            style={{ backgroundColor: theme.color }}
            title={theme.name}
          >
            {currentTheme === theme.id && <AnimatedIcons.Check />}
          </button>
        ))}
      </div>
    </div>
  );
};

// Real-time Notifications Panel
const NotificationsPanel = ({ isOpen, onClose, notifications }) => {
  if (!isOpen) return null;

  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <h4>🔔 Recent Notifications</h4>
        <button onClick={onClose} className="panel-close">
          <AnimatedIcons.X />
        </button>
      </div>
      <div className="notifications-list">
        {notifications.map((notif, index) => (
          <div key={index} className="notification-item">
            <div className="notification-dot"></div>
            <div className="notification-content">
              <p className="notification-text">{notif.message}</p>
              <span className="notification-time">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Order Details Modal Component (Enhanced)
const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  if (!isOpen || !order) return null;

  return (
    <div className="modal-overlay modal-enter" onClick={onClose}>
      <div className="modal-content modal-bounce order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🛒 Order Details #{order.id}</h3>
          <button onClick={onClose} className="modal-close">
            <AnimatedIcons.X />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="order-details-info">
            <div className="order-customer">
              <h4>Customer Information</h4>
              <div className="customer-card">
                <div className="customer-avatar-large">
                  {order && order.customer_name ? order.customer_name.charAt(0) : '?'}
                </div>
                <div className="customer-info-detailed">
                  <p className="customer-name-large">{order.customer_name}</p>
                  <p className="customer-email">customer@email.com</p>
                  <p className="customer-phone">+62 812-3456-7890</p>
                </div>
              </div>
            </div>

            <div className="order-summary">
              <h4>Order Summary</h4>
              <div className="order-items">
                <div className="order-item-detail">
                  <span className="item-name">{order.items || 'Mixed Dairy Products'}</span>
                  <span className="item-price">Rp {Number(order.total_amount).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="order-status-detail">
                <span className={`status-badge-large status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
                <span className="order-date-detail">{order.order_date}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
          <button 
            onClick={() => setEmailModalOpen(true)}
            className="btn-primary"
          >
            <AnimatedIcons.Email />
            <span>Send Update</span>
          </button>
        </div>

        <EmailModal 
          isOpen={emailModalOpen}
          onClose={() => setEmailModalOpen(false)}
          type="notification"
          recipient="customer@email.com"
        />
      </div>
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pageLoading, setPageLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [theme, setTheme] = useState('natural');

  // Modal states
  const [showAdvancedAnalytics, setShowAdvancedAnalytics] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [excelModalType, setExcelModalType] = useState('export');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notificationsPanel, setNotificationsPanel] = useState(false);

  // Real-time notifications
  const [realTimeNotifications, setRealTimeNotifications] = useState([
    { message: 'New order received from Toko Sari Rasa', time: '2 minutes ago' },
    { message: 'Stock alert: Yogurt Strawberry is running low', time: '5 minutes ago' },
    { message: 'Order #1 has been delivered successfully', time: '10 minutes ago' },
    { message: 'New customer registration: Supermarket Maju', time: '15 minutes ago' }
  ]);

  // Dashboard data
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    products: [],
    orders: []
  });

  // Product management state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Milk',
    price: '',
    stock: '',
    expiry_date: ''
  });

  const categories = ['All', 'Milk', 'Yogurt', 'Cheese', 'Butter'];

  // Animation states
  const [statsVisible, setStatsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  // Notification system
  const addNotification = (type, title, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, title, message }]);
    
    // Add to real-time notifications
    if (type !== 'error') {
      setRealTimeNotifications(prev => [
        { message: `${title}: ${message}`, time: 'Just now' },
        ...prev.slice(0, 9)
      ]);
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Theme handling
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    addNotification('success', 'Theme Changed', `Switched to ${newTheme} theme`);
  };

  // Fixed fetchDashboardData with useCallback
  const fetchDashboardData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch dashboard stats
      const statsResponse = await fetch('http://localhost:3001/api/dashboard/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsResponse.json();

      // Fetch products
      const productsResponse = await fetch('http://localhost:3001/api/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const productsData = await productsResponse.json();

      // Fetch orders
      const ordersResponse = await fetch('http://localhost:3001/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const ordersData = await ordersResponse.json();

      setDashboardData({
        stats: statsData.success ? statsData.data : {},
        products: productsData.success ? productsData.data : [],
        orders: ordersData.success ? ordersData.data : []
      });
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      addNotification('error', 'Data Error', 'Failed to fetch dashboard data');
    }
  }, []);

  // Check for existing login on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Fetch dashboard data when user is logged in
  useEffect(() => {
    if (user) {
      fetchDashboardData();
      // Trigger animations
      setTimeout(() => setStatsVisible(true), 500);
      setTimeout(() => setCardsVisible(true), 1000);
    }
  }, [user, fetchDashboardData]);

  // Page transition effect
  useEffect(() => {
    setPageLoading(true);
    setTimeout(() => setPageLoading(false), 300);
  }, [activeTab]);

  // Simulate real-time updates
  useEffect(() => {
    if (!user) return;
    
    const interval = setInterval(() => {
      const randomEvents = [
        'New order received',
        'Stock level updated',
        'Customer inquiry received',
        'Payment processed',
        'Delivery completed'
      ];
      
      const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      setRealTimeNotifications(prev => [
        { message: randomEvent, time: 'Just now' },
        ...prev.slice(0, 9)
      ]);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@greenfields.com',
          password: 'admin123'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        const { user, token } = data.data;
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        addNotification('success', 'Welcome!', `Login successful! Welcome to Dashboard Dairy Management (Demo) ${user.name}`);
      } else {
        setError(data.error?.message || 'Login failed');
        addNotification('error', 'Login Failed', data.error?.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please check if backend is running on localhost:3001');
      addNotification('error', 'Connection Error', 'Please check backend connection');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    addNotification('success', 'Goodbye!', 'Successfully logged out');
  };

  // Advanced: Order action handlers
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
    addNotification('info', 'Order Details', `Viewing Order #${order.id} for ${order.customer_name}`);
  };

  const handleEditOrder = (order) => {
    const newStatus = order.status === 'PENDING' ? 'PROCESSING' : 
                     order.status === 'PROCESSING' ? 'DELIVERED' : 'PENDING';
    
    setDashboardData(prev => ({
      ...prev,
      orders: prev.orders.map(o => 
        o.id === order.id ? { ...o, status: newStatus } : o
      ),
      stats: {
        ...prev.stats,
        recent_orders: prev.stats.recent_orders?.map(o => 
          o.id === order.id ? { ...o, status: newStatus } : o
        )
      }
    }));
    
    addNotification('success', 'Order Updated', `Order #${order.id} status changed to ${newStatus}`);
  };

  // Advanced: Analytics handler
  const handleViewAdvancedAnalytics = () => {
    setShowAdvancedAnalytics(true);
    addNotification('info', 'Analytics', 'Loading comprehensive business intelligence');
  };

  // Advanced: Excel functions
  const handleExportExcel = () => {
    setExcelModalType('export');
    setShowExcelModal(true);
    addNotification('info', 'Export Ready', 'Preparing data for Excel export');
  };

  const handleImportExcel = () => {
    setExcelModalType('import');
    setShowExcelModal(true);
    addNotification('info', 'Import Ready', 'Ready to import Excel data');
  };

  // Advanced: Email functions
  const handleSendBulkEmail = () => {
    setShowEmailModal(true);
    addNotification('info', 'Email System', 'Opening email composer');
  };

  // Product management functions (Enhanced)
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      addNotification('error', 'Validation Error', 'Please fill all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock)
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setNewProduct({ name: '', category: 'Milk', price: '', stock: '', expiry_date: '' });
        setShowAddProduct(false);
        fetchDashboardData();
        addNotification('success', 'Product Added!', `${newProduct.name} has been added successfully`);
        
        // Check for low stock warning
        if (parseInt(newProduct.stock) < 50) {
          addNotification('info', 'Stock Warning', `${newProduct.name} has low initial stock`);
        }
      } else {
        addNotification('error', 'Failed to Add', data.error?.message || 'Failed to add product');
      }
    } catch (err) {
      addNotification('error', 'Network Error', 'Failed to add product. Please try again.');
    }
  };

  const handleEditProduct = (product) => {
    console.log('Editing product:', product);
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      expiry_date: product.expiry_date ? new Date(product.expiry_date).toISOString().split('T')[0] : ''
    });
    setShowAddProduct(true);
    addNotification('info', 'Edit Mode', `Editing ${product.name}`);
  };

  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock)
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setEditingProduct(null);
        setNewProduct({ name: '', category: 'Milk', price: '', stock: '', expiry_date: '' });
        setShowAddProduct(false);
        fetchDashboardData();
        addNotification('success', 'Product Updated!', `${newProduct.name} has been updated successfully`);
        
        // Advanced: Stock level notifications
        const newStock = parseInt(newProduct.stock);
        if (newStock < 25) {
          addNotification('error', 'Critical Stock!', `${newProduct.name} has critically low stock (${newStock} units)`);
        } else if (newStock < 50) {
          addNotification('info', 'Low Stock Alert', `${newProduct.name} is running low (${newStock} units)`);
        }
      } else {
        addNotification('error', 'Update Failed', data.error?.message || 'Failed to update product');
      }
    } catch (err) {
      addNotification('error', 'Network Error', 'Failed to update product. Please try again.');
    }
  };

  const handleDeleteProduct = async (id, productName) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      
      if (data.success) {
        fetchDashboardData();
        addNotification('success', 'Product Deleted!', `${productName} has been deleted successfully`);
      } else {
        addNotification('error', 'Delete Failed', data.error?.message || 'Failed to delete product');
      }
    } catch (err) {
      addNotification('error', 'Network Error', 'Failed to delete product. Please try again.');
    }
  };

  // Filter products based on search and category
  const filteredProducts = dashboardData.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate stock health percentage
  const getStockHealth = (stock) => {
    if (stock >= 100) return { percentage: 100, color: 'green', status: 'Excellent' };
    if (stock >= 50) return { percentage: 75, color: 'blue', status: 'Good' };
    if (stock >= 25) return { percentage: 50, color: 'yellow', status: 'Low' };
    return { percentage: 25, color: 'red', status: 'Critical' };
  };

  // Enhanced Dashboard Component
  const Dashboard = () => (
    <div className={`dashboard-content ${pageLoading ? 'page-loading' : 'page-loaded'}`}>
      <div className="page-header">
        <div>
          <h2 className="page-title animated-title">
            <AnimatedIcons.BarChart className="title-icon" />
             Dashboard
          </h2>
          <div className="page-subtitle">Comprehensive business intelligence & real-time analytics</div>
        </div>
        <div className="header-actions">
          <button onClick={handleViewAdvancedAnalytics} className="btn-primary">
            <AnimatedIcons.Analytics />
             Analytics
          </button>
          <button onClick={handleExportExcel} className="btn-secondary">
            <AnimatedIcons.Download />
            Export Data
          </button>
        </div>
      </div>
      
      {/* Enhanced Stats Cards with Real-time Updates */}
      <div className={`stats-grid ${statsVisible ? 'stats-visible' : ''}`}>
        <div className="stat-card stat-card-1 enhanced" style={{ animationDelay: '0.1s' }}>
          <div className="stat-background">
            <div className="stat-pattern"></div>
          </div>
          <div className="stat-icon">
            <AnimatedIcons.Package />
          </div>
          <div className="stat-content">
            <h3>Total Products</h3>
            <p className="stat-number">
              <AnimatedCounter value={dashboardData.stats.total_products || 0} />
            </p>
            <div className="stat-trend">
              <span className="trend-up">↗ +12% this month</span>
            </div>
            <div className="stat-actions">
              <button onClick={handleImportExcel} className="stat-action-btn">
                <AnimatedIcons.Upload />
              </button>
              <button onClick={() => setActiveTab('products')} className="stat-action-btn">
                <AnimatedIcons.Eye />
              </button>
            </div>
          </div>
          <div className="stat-sparkline">
            <div className="sparkline-bar" style={{ height: '60%', animationDelay: '0.1s' }}></div>
            <div className="sparkline-bar" style={{ height: '80%', animationDelay: '0.2s' }}></div>
            <div className="sparkline-bar" style={{ height: '40%', animationDelay: '0.3s' }}></div>
            <div className="sparkline-bar" style={{ height: '90%', animationDelay: '0.4s' }}></div>
            <div className="sparkline-bar" style={{ height: '100%', animationDelay: '0.5s' }}></div>
          </div>
        </div>
        
        <div className="stat-card stat-card-2 enhanced" style={{ animationDelay: '0.2s' }}>
          <div className="stat-background">
            <div className="stat-pattern"></div>
          </div>
          <div className="stat-icon">
            <AnimatedIcons.ShoppingCart />
          </div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-number">
              <AnimatedCounter value={dashboardData.stats.total_orders || 0} />
            </p>
            <div className="stat-trend">
              <span className="trend-up">↗ +8% this week</span>
            </div>
            <div className="stat-actions">
              <button onClick={handleSendBulkEmail} className="stat-action-btn">
                <AnimatedIcons.Email />
              </button>
              <button onClick={() => setActiveTab('orders')} className="stat-action-btn">
                <AnimatedIcons.Eye />
              </button>
            </div>
          </div>
          <div className="stat-progress">
            <ProgressBar percentage={85} color="green" />
          </div>
        </div>

        <div className="stat-card stat-card-3 enhanced" style={{ animationDelay: '0.3s' }}>
          <div className="stat-background">
            <div className="stat-pattern"></div>
          </div>
          <div className="stat-icon">
            <AnimatedIcons.Money />
          </div>
          <div className="stat-content">
            <h3>Revenue</h3>
            <p className="stat-number">
              Rp <AnimatedCounter value={dashboardData.stats.total_revenue || 0} />
            </p>
            <div className="stat-trend">
              <span className="trend-up">↗ +24% this quarter</span>
            </div>
            <div className="stat-actions">
              <button onClick={handleViewAdvancedAnalytics} className="stat-action-btn">
                <AnimatedIcons.Analytics />
              </button>
              <button onClick={handleExportExcel} className="stat-action-btn">
                <AnimatedIcons.Download />
              </button>
            </div>
          </div>
          <div className="stat-chart">
            <div className="mini-chart">
              {[20, 35, 45, 30, 55, 65, 80].map((height, i) => (
                <div 
                  key={i}
                  className="chart-bar"
                  style={{ 
                    height: `${height}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-4 stat-alert enhanced" style={{ animationDelay: '0.4s' }}>
          <div className="stat-background">
            <div className="stat-pattern"></div>
          </div>
          <div className="stat-icon">
            <AnimatedIcons.Alert />
          </div>
          <div className="stat-content">
            <h3>Low Stock Alert</h3>
            <p className="stat-number">
              <AnimatedCounter value={dashboardData.stats.low_stock_count || 0} />
            </p>
            <div className="stat-trend">
              <span className="trend-down">Needs attention</span>
            </div>
            <div className="stat-actions">
              <button onClick={handleSendBulkEmail} className="stat-action-btn">
                <AnimatedIcons.Email />
              </button>
              <button onClick={() => setActiveTab('products')} className="stat-action-btn">
                <AnimatedIcons.Settings />
              </button>
            </div>
          </div>
          <div className="alert-pulse">
            <div className="pulse-ring"></div>
            <div className="pulse-ring"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Dashboard Cards */}
      <div className={`dashboard-grid ${cardsVisible ? 'cards-visible' : ''}`}>
        {/* Recent Orders with Enhanced Actions */}
        <div className="dashboard-card card-slide-up enhanced-card" style={{ animationDelay: '0.1s' }}>
          <div className="card-header">
            <h3 className="card-title">
              <AnimatedIcons.ShoppingCart className="card-icon" />
              Recent Orders
            </h3>
            <div className="card-badges">
              <div className="card-badge">Live</div>
              <button onClick={handleSendBulkEmail} className="card-action-btn">
                <AnimatedIcons.Email />
              </button>
            </div>
          </div>
          <div className="recent-orders">
            {(dashboardData.stats.recent_orders || []).slice(0, 5).map((order, index) => (
              <div 
                key={order.id} 
                className="order-item order-item-animate enhanced"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="order-avatar">
                  {order && order.customer_name ? order.customer_name.charAt(0) : '?'}
                </div>
                <div className="order-info">
                  <p className="customer-name">{order.customer_name}</p>
                  <p className="order-id">Order #{order.id}</p>
                </div>
                <div className="order-details">
                  <p className="order-amount">Rp {order.total_amount?.toLocaleString()}</p>
                  <span className={`status-badge status-${order.status.toLowerCase()} badge-bounce`}>
                    {order.status}
                  </span>
                </div>
                <div className="order-actions enhanced">
                  <button 
                    className="action-btn"
                    onClick={() => handleViewOrder(order)}
                    title="View Order Details"
                  >
                    <AnimatedIcons.Eye />
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => setShowEmailModal(true)}
                    title="Send Email"
                  >
                    <AnimatedIcons.Email />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Monitor with Advanced Features */}
        <div className="dashboard-card card-slide-up enhanced-card" style={{ animationDelay: '0.2s' }}>
          <div className="card-header">
            <h3 className="card-title">
              <AnimatedIcons.Alert className="card-icon" />
              Smart Stock Monitor
            </h3>
            <div className="card-badges">
              <div className="card-badge alert-badge">AI Alert</div>
              <button onClick={handleImportExcel} className="card-action-btn">
                <AnimatedIcons.Upload />
              </button>
            </div>
          </div>
          <div className="low-stock-list">
            {dashboardData.products.filter(p => p.stock < 100).slice(0, 5).map((product, index) => {
              const stockHealth = getStockHealth(product.stock);
              return (
                <div 
                  key={product.id} 
                  className="low-stock-item stock-item-animate enhanced"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="product-icon">
                    {product.category === 'Milk' && '🥛'}
                    {product.category === 'Yogurt' && '🍦'}
                    {product.category === 'Cheese' && '🧀'}
                    {product.category === 'Butter' && '🧈'}
                  </div>
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-category">{product.category}</p>
                    <div className="product-actions-mini">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="mini-action-btn"
                        title="Quick Edit"
                      >
                        <AnimatedIcons.Edit />
                      </button>
                      <button 
                        onClick={handleSendBulkEmail}
                        className="mini-action-btn"
                        title="Send Alert"
                      >
                        <AnimatedIcons.Email />
                      </button>
                    </div>
                  </div>
                  <div className="stock-info">
                    <p className="stock-count">{product.stock} units</p>
                    <ProgressBar 
                      percentage={stockHealth.percentage} 
                      color={stockHealth.color}
                      label={stockHealth.status}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Advanced Sales Analytics Chart */}
        <div className="dashboard-card card-slide-up enhanced-card full-width" style={{ animationDelay: '0.3s' }}>
          <div className="card-header">
            <h3 className="card-title">
              <AnimatedIcons.BarChart className="card-icon" />
               Sales Analytics
            </h3>
            <div className="card-actions">
              <button 
                className="btn-ghost"
                onClick={handleViewAdvancedAnalytics}
              >
                <AnimatedIcons.Analytics />
                 View
              </button>
              <button 
                className="btn-ghost"
                onClick={handleExportExcel}
              >
                <AnimatedIcons.Download />
                Export
              </button>
            </div>
          </div>
          <div className="analytics-chart">
            <div className="chart-container">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const height = Math.random() * 80 + 20;
                return (
                  <div key={day} className="chart-column">
                    <div 
                      className="chart-bar-3d enhanced"
                      style={{ 
                        height: `${height}%`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    >
                      <div className="bar-tooltip">
                        {day}: Rp {(Math.random() * 500000 + 100000).toLocaleString()}
                      </div>
                    </div>
                    <div className="chart-label">{day}</div>
                  </div>
                );
              })}
            </div>
            <div className="chart-insights">
              <div className="insight-item">
                <span className="insight-label">Peak Day:</span>
                <span className="insight-value">Friday</span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Growth:</span>
                <span className="insight-value trend-up">+15%</span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Forecast:</span>
                <span className="insight-value">Excellent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Products Component
  const Products = () => (
    <div className={`products-content ${pageLoading ? 'page-loading' : 'page-loaded'}`}>
      <div className="page-header">
        <div>
          <h2 className="page-title animated-title">
            <AnimatedIcons.Package className="title-icon" />
             Product Management
          </h2>
          <div className="page-subtitle">AI-powered inventory management with smart insights</div>
        </div>
        <div className="header-actions">
          <button
            onClick={() => setShowAddProduct(true)}
            className="btn-primary btn-float"
          >
            <AnimatedIcons.Plus className="btn-icon" />
            Add Product
          </button>
          <button onClick={handleImportExcel} className="btn-secondary">
            <AnimatedIcons.Upload />
            Import Excel
          </button>
          <button onClick={handleExportExcel} className="btn-secondary">
            <AnimatedIcons.Download />
            Export Excel
          </button>
        </div>
      </div>

      {/* Enhanced Search and Filter */}
      <div className="search-filter-bar animate-slide-down enhanced">
        <div className="search-box glass-effect">
          <AnimatedIcons.Search />
          <input
            type="text"
            placeholder="Search products with AI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="search-clear"
            >
              <AnimatedIcons.X />
            </button>
          )}
        </div>
        <div className="filter-box glass-effect">
          <AnimatedIcons.Filter />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="results-count enhanced">
          <span className="count-badge">{filteredProducts.length}</span> products found
          <button onClick={handleSendBulkEmail} className="bulk-action-btn">
            <AnimatedIcons.Email />
            Bulk Email
          </button>
        </div>
      </div>

      {/* Enhanced Products Grid */}
      <div className="products-grid animate-fade-in">
        {filteredProducts.map((product, index) => {
          const stockHealth = getStockHealth(product.stock);
          return (
            <div 
              key={product.id} 
              className="product-card product-card-animate enhanced"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="product-image">
                <div className="product-icon-large">
                  {product.category === 'Milk' && '🥛'}
                  {product.category === 'Yogurt' && '🍦'}
                  {product.category === 'Cheese' && '🧀'}
                  {product.category === 'Butter' && '🧈'}
                </div>
                <div className={`category-badge category-${product.category.toLowerCase()}`}>
                  {product.category}
                </div>
                {product.stock < 25 && (
                  <div className="urgent-badge">
                    <AnimatedIcons.Alert />
                    URGENT
                  </div>
                )}
              </div>
              
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  Rp {Number(product.price).toLocaleString()}
                </div>
                
                <div className="product-stats">
                  <div className="stat-item">
                    <span className="stat-label">Stock</span>
                    <span className={`stat-value ${product.stock < 50 ? 'stock-low' : 'stock-ok'}`}>
                      {product.stock} units
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Expiry</span>
                    <span className="stat-value">{product.expiry_date || 'N/A'}</span>
                  </div>
                </div>

                <div className="stock-health">
                  <ProgressBar 
                    percentage={stockHealth.percentage}
                    color={stockHealth.color}
                    label={`Stock: ${stockHealth.status}`}
                  />
                </div>

                <div className="product-insights">
                  <div className="insight-tag">
                    📊 Sales: {Math.floor(Math.random() * 50 + 10)}/week
                  </div>
                  <div className="insight-tag">
                    🎯 Demand: {stockHealth.percentage > 75 ? 'High' : stockHealth.percentage > 50 ? 'Medium' : 'Low'}
                  </div>
                </div>
              </div>

              <div className="product-actions">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="btn-action btn-edit"
                  title="Edit Product"
                >
                  <AnimatedIcons.Edit />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id, product.name)}
                  className="btn-action btn-delete"
                  title="Delete Product"
                >
                  <AnimatedIcons.Trash />
                </button>
                <button
                  onClick={handleSendBulkEmail}
                  className="btn-action btn-email"
                  title="Send Alert"
                >
                  <AnimatedIcons.Email />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-state enhanced">
          <div className="empty-icon">📦</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button onClick={handleImportExcel} className="btn-primary">
            <AnimatedIcons.Upload />
            Import Products
          </button>
        </div>
      )}
    </div>
  );

  // Enhanced Orders Component
  const Orders = () => (
    <div className={`orders-content ${pageLoading ? 'page-loading' : 'page-loaded'}`}>
      <div className="page-header">
        <div>
          <h2 className="page-title animated-title">
            <AnimatedIcons.ShoppingCart className="title-icon" />
             Order Management
          </h2>
          <div className="page-subtitle">Real-time order tracking with automated workflows</div>
        </div>
        <div className="header-actions">
          <button onClick={handleSendBulkEmail} className="btn-primary">
            <AnimatedIcons.Email />
            Bulk Email
          </button>
          <button onClick={handleExportExcel} className="btn-secondary">
            <AnimatedIcons.Download />
            Export Orders
          </button>
        </div>
      </div>

      {/* Enhanced Orders Table */}
      <div className="orders-table-container animate-fade-in">
        <div className="order-status-summary">
          <div className="status-item">
            <div className="status-icon status-pending-bg">
              <AnimatedIcons.ShoppingCart />
            </div>
            <div className="status-details">
              <span className="status-label">Pending</span>
              <span className="status-count">
                {dashboardData.orders.filter(o => o.status === 'PENDING').length}
              </span>
            </div>
          </div>
          <div className="status-item">
            <div className="status-icon status-processing-bg">
              <AnimatedIcons.Package />
            </div>
            <div className="status-details">
              <span className="status-label">Processing</span>
              <span className="status-count">
                {dashboardData.orders.filter(o => o.status === 'PROCESSING').length}
              </span>
            </div>
          </div>
          <div className="status-item">
            <div className="status-icon status-delivered-bg">
              <AnimatedIcons.Check />
            </div>
            <div className="status-details">
              <span className="status-label">Delivered</span>
              <span className="status-count">
                {dashboardData.orders.filter(o => o.status === 'DELIVERED').length}
              </span>
            </div>
          </div>
        </div>

        <div className="orders-table">
          <div className="orders-table-header">
            <div className="order-column">Order ID</div>
            <div className="order-column">Customer</div>
            <div className="order-column">Date</div>
            <div className="order-column">Amount</div>
            <div className="order-column">Status</div>
            <div className="order-column">Actions</div>
          </div>
          <div className="orders-table-body">
            {dashboardData.orders.map((order, index) => (
              <div 
                key={order.id} 
                className="order-row order-row-animate"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="order-column">
                  #{order.id}
                </div>
                <div className="order-column customer-column">
                  <div className="customer-avatar-small">
                    {order && order.customer_name ? order.customer_name.charAt(0) : '?'}
                  </div>
                  <span className="customer-name-small">{order.customer_name}</span>
                </div>
                <div className="order-column">
                  {order.order_date}
                </div>
                <div className="order-column">
                  Rp {Number(order.total_amount).toLocaleString()}
                </div>
                <div className="order-column">
                  <div className="order-status-timeline">
                    <div className={`timeline-point ${order.status === 'PENDING' || order.status === 'PROCESSING' || order.status === 'DELIVERED' ? 'active' : ''}`}>
                      <div className="timeline-tooltip">Pending</div>
                    </div>
                    <div className="timeline-line"></div>
                    <div className={`timeline-point ${order.status === 'PROCESSING' || order.status === 'DELIVERED' ? 'active' : ''}`}>
                      <div className="timeline-tooltip">Processing</div>
                    </div>
                    <div className="timeline-line"></div>
                    <div className={`timeline-point ${order.status === 'DELIVERED' ? 'active' : ''}`}>
                      <div className="timeline-tooltip">Delivered</div>
                    </div>
                  </div>
                </div>
                <div className="order-column actions-column">
                  <button 
                    onClick={() => handleViewOrder(order)}
                    className="btn-icon"
                    title="View Details"
                  >
                    <AnimatedIcons.Eye />
                  </button>
                  <button 
                    onClick={() => handleEditOrder(order)}
                    className="btn-icon"
                    title="Change Status"
                  >
                    <AnimatedIcons.Edit />
                  </button>
                  <button 
                    onClick={() => setShowEmailModal(true)}
                    className="btn-icon"
                    title="Send Email"
                  >
                    <AnimatedIcons.Email />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {dashboardData.orders.length === 0 && (
          <div className="empty-state enhanced">
            <div className="empty-icon">🛒</div>
            <h3>No orders found</h3>
            <p>New orders will appear here</p>
          </div>
        )}

        <div className="orders-analytics">
          <h3 className="analytics-header">
            <AnimatedIcons.Analytics />
            Order Analytics
          </h3>
          <div className="analytics-items">
            <div className="analytics-item">
              <div className="analytics-label">Average Order Value</div>
              <div className="analytics-value">Rp 320,500</div>
            </div>
            <div className="analytics-item">
              <div className="analytics-label">Order Frequency</div>
              <div className="analytics-value">3.2 days</div>
            </div>
            <div className="analytics-item">
              <div className="analytics-label">Repeat Rate</div>
              <div className="analytics-value">68%</div>
            </div>
            <div className="analytics-item">
              <div className="analytics-label">Processing Time</div>
              <div className="analytics-value">4.8 hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Add Product Modal
  const AddProductModal = () => {
    if (!showAddProduct) return null;

    return (
      <div className="modal-overlay modal-enter" onClick={() => setShowAddProduct(false)}>
        <div className="modal-content modal-bounce" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>
              {editingProduct ? (
                <>
                  <AnimatedIcons.Edit />
                  Edit Product
                </>
              ) : (
                <>
                  <AnimatedIcons.Plus />
                  Add New Product
                </>
              )}
            </h3>
            <button onClick={() => {
              setShowAddProduct(false);
              setEditingProduct(null);
              setNewProduct({ name: '', category: 'Milk', price: '', stock: '', expiry_date: '' });
            }} className="modal-close">
              <AnimatedIcons.X />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="form-group">
              <label>Product Name</label>
              <div className="input-container">
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="form-input"
                  placeholder="e.g. Fresh Full Cream Milk"
                />
                <div className="input-highlight"></div>
              </div>
            </div>

            <div className="form-group">
              <label>Category</label>
              <div className="input-container">
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="form-input"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="input-highlight"></div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Price (Rp)</label>
                <div className="input-container">
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="form-input"
                    placeholder="e.g. 25000"
                    min="0"
                  />
                  <div className="input-highlight"></div>
                </div>
              </div>

              <div className="form-group half">
                <label>Stock (Units)</label>
                <div className="input-container">
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    className="form-input"
                    placeholder="e.g. 100"
                    min="0"
                  />
                  <div className="input-highlight"></div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Expiry Date</label>
              <div className="input-container">
                <input
                  type="date"
                  value={newProduct.expiry_date}
                  onChange={(e) => setNewProduct({...newProduct, expiry_date: e.target.value})}
                  className="form-input"
                />
                <div className="input-highlight"></div>
              </div>
            </div>

            {/* AI-Powered Insights */}
            {newProduct.name && newProduct.price && (
              <div className="product-insights-box">
                <h4>
                  <AnimatedIcons.Analytics />
                  AI Insights
                </h4>
                <div className="insights-content">
                  <div className="insight-item-advanced">
                    <span className="insight-icon">📊</span>
                    <div className="insight-content">
                      <span className="insight-title">Optimal Price Range</span>
                      <span className="insight-value">
                        Rp {(parseFloat(newProduct.price) * 0.9).toFixed(0)} - Rp {(parseFloat(newProduct.price) * 1.1).toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <div className="insight-item-advanced">
                    <span className="insight-icon">📦</span>
                    <div className="insight-content">
                      <span className="insight-title">Recommended Stock</span>
                      <span className="insight-value">
                        {newProduct.category === 'Milk' ? '150-200' : 
                         newProduct.category === 'Yogurt' ? '100-150' : 
                         newProduct.category === 'Cheese' ? '75-125' : '50-100'} units
                      </span>
                    </div>
                  </div>
                  <div className="insight-item-advanced">
                    <span className="insight-icon">🔮</span>
                    <div className="insight-content">
                      <span className="insight-title">Predicted Demand</span>
                      <span className="insight-value">
                        {newProduct.category === 'Milk' ? 'High' : 
                         newProduct.category === 'Yogurt' ? 'Medium-High' : 
                         newProduct.category === 'Cheese' ? 'Medium' : 'Medium-Low'} 
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            <button onClick={() => {
              setShowAddProduct(false);
              setEditingProduct(null);
              setNewProduct({ name: '', category: 'Milk', price: '', stock: '', expiry_date: '' });
            }} className="btn-secondary">
              Cancel
            </button>
            <button
              onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
              className="btn-primary"
            >
              {editingProduct ? (
                <>
                  <AnimatedIcons.Edit />
                  Update Product
                </>
              ) : (
                <>
                  <AnimatedIcons.Plus />
                  Add Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Login component (Enhanced)
  const Login = () => (
    <div className="login-container">
      <div className="login-background">
        <div className="bg-animation">
          <div className="floating-icon">🥛</div>
          <div className="floating-icon">🧀</div>
          <div className="floating-icon">🍦</div>
          <div className="floating-icon">🧈</div>
        </div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="logo-animation">
            <span className="logo-icon">🏢</span>
            <div className="logo-ripple"></div>
          </div>
          <h1 className="login-title">Greenfields Indonesia</h1>
          <p className="login-subtitle">Dairy Management System</p>
          <span className="version-badge-animated">Dashboard Dairy Management System (Demo)</span>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <div className="input-container">
              <input
                type="email"
                defaultValue="admin@greenfields.com"
                placeholder="Enter your email"
                className="form-input"
                disabled={loading}
              />
              <div className="input-highlight"></div>
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <input
                type="password"
                defaultValue="admin123"
                placeholder="Enter your password"
                className="form-input"
                disabled={loading}
              />
              <div className="input-highlight"></div>
            </div>
          </div>

          {error && (
            <div className="error-message animate-shake">
              <AnimatedIcons.Alert />
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-btn" 
            disabled={loading}
          >
            {loading ? (
              <div className="btn-loading">
                <AnimatedIcons.Loading />
                <span>Logging in...</span>
              </div>
            ) : (
              <div className="btn-content">
                <span>Login</span>
              </div>
            )}
            <div className="btn-shine"></div>
          </button>
        </form>

        <div className="login-features">
          <h4>Main Features:</h4>
          <ul className="features-list">
            <li>🔥 Real-time Analytics & Dashboards</li>
            <li>📧 Email System with Templates</li>
            <li>📊 Excel Import/Export</li>
            <li>🔔 Real-time Notifications</li>
            <li>🎨 Multiple Theme Support</li>
            <li>🤖 AI-Powered Insights & Recommendations</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      {/* Add notification system */}
      <NotificationSystem 
        notifications={notifications} 
        onRemove={removeNotification} 
      />

      {/* Display loading spinner while fetching data */}
      {loading && <LoadingSpinner />}

      {/* Show login if user is not authenticated */}
      {!user ? (
        <Login />
      ) : (
        <>
          {/* Header */}
          <header className="app-header enhanced">
            <div className="header-content">
              <div className="header-left">
                <div className="logo-container">
                  <span className="animated-logo">🥛</span>
                  <div className="logo-pulse"></div>
                </div>
                <div className="brand-info">
                  <h1>Greenfields</h1>
                  <span className="version-badge">Dashboard Dairy Management (Demo)</span>
                </div>
              </div>

              <div className="header-center">
                <ThemeSwitcher 
                  currentTheme={theme}
                  onThemeChange={handleThemeChange}
                />
              </div>

              <div className="header-right">
                <button 
                  className="notifications-btn"
                  onClick={() => setNotificationsPanel(!notificationsPanel)}
                >
                  <AnimatedIcons.Bell />
                  <div className="notifications-count">
                    {realTimeNotifications.length}
                  </div>
                </button>

                <div className="user-info">
                  <div className="user-avatar">
                    {user && user.name ? user.name.charAt(0) : '?'}
                  </div>
                  <div className="user-details">
                    <span className="user-welcome">Welcome back,</span>
                    <span className="username">{user.name}</span>
                  </div>
                </div>

                <button onClick={handleLogout} className="btn-logout">
                  Logout
                  <div className="btn-ripple"></div>
                </button>
              </div>
            </div>
          </header>

          {/* Navigation */}
          <nav className="app-nav enhanced">
            <div className="nav-content">
              <button
                className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <AnimatedIcons.BarChart className="nav-icon" />
                Dashboard
                <div className={`nav-indicator ${activeTab === 'dashboard' ? 'active' : ''}`}></div>
              </button>
              <button
                className={`nav-tab ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                <AnimatedIcons.Package className="nav-icon" />
                Products
                <div className={`nav-indicator ${activeTab === 'products' ? 'active' : ''}`}></div>
              </button>
              <button
                className={`nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <AnimatedIcons.ShoppingCart className="nav-icon" />
                Orders
                <div className={`nav-indicator ${activeTab === 'orders' ? 'active' : ''}`}></div>
              </button>
            </div>
          </nav>

          {/* Main Content */}
          <main className="app-main">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'products' && <Products />}
            {activeTab === 'orders' && <Orders />}
          </main>

          {/* Modals */}
          <AddProductModal />
          <AdvancedAnalyticsModal 
            isOpen={showAdvancedAnalytics}
            onClose={() => setShowAdvancedAnalytics(false)}
            data={dashboardData}
          />
          <OrderDetailsModal 
            isOpen={showOrderDetails}
            onClose={() => setShowOrderDetails(false)}
            order={selectedOrder}
          />
          <EmailModal 
            isOpen={showEmailModal}
            onClose={() => setShowEmailModal(false)}
          />
          <ExcelModal 
            isOpen={showExcelModal}
            onClose={() => setShowExcelModal(false)}
            type={excelModalType}
            data={excelModalType === 'export' ? 
              (activeTab === 'products' ? dashboardData.products : dashboardData.orders) : []}
          />
          <NotificationsPanel 
            isOpen={notificationsPanel}
            onClose={() => setNotificationsPanel(false)}
            notifications={realTimeNotifications}
          />
        </>
      )}
    </div>
  );
}

export default App;