const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, dashboardController.getDashboard);
router.get('/api/stats', authMiddleware, dashboardController.getStats);
router.get('/api/room-stats', authMiddleware, dashboardController.getRoomStats);
router.get('/api/revenue-stats', authMiddleware, dashboardController.getRevenueStats);

module.exports = router;