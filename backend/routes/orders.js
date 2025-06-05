const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, OrderController.index);
router.get('/:id', authenticateToken, OrderController.show);

module.exports = router;