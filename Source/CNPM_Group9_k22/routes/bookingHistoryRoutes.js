const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const customerAuthMiddleware = require('../middlewares/customerAuthMiddleware');

router.get('/', customerAuthMiddleware, bookingController.getBookingHistory);

module.exports = router;