const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const customerAuthMiddleware = require('../middlewares/customerAuthMiddleware');
const authMiddleware = require('../middlewares/authMiddleware'); // Admin auth middleware

router.post('/', customerAuthMiddleware, bookingController.handleBooking);
router.get('/payment', customerAuthMiddleware, bookingController.renderBookingPaymentPage);
router.post('/cancel/:bookingId', customerAuthMiddleware, bookingController.cancelBooking);
router.get('/all', authMiddleware, bookingController.getAllBookings); // Protect this route with admin auth middleware

module.exports = router;