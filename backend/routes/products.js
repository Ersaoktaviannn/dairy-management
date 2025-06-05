const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { authenticateToken, authorize } = require('../middleware/auth');

router.get('/', ProductController.index);
router.get('/low-stock', ProductController.lowStock);
router.get('/:id', ProductController.show);
router.post('/', authenticateToken, authorize(['admin', 'staff']), ProductController.store);
router.put('/:id', authenticateToken, authorize(['admin', 'staff']), ProductController.update);
router.delete('/:id', authenticateToken, authorize(['admin']), ProductController.destroy);

module.exports = router;