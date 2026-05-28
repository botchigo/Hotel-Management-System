const bookingModel = require('../models/bookingModel');
const roomModel = require('../models/roomModel');

exports.handleBooking = async (req, res) => {
    try {
        const { room_id, customer_id, check_in_date, check_out_date, status, total_price } = req.body;
        const newBooking = {
            booking_id: `B${Date.now()}`,
            room_id,
            customer_id,
            check_in_date: new Date(check_in_date),
            check_out_date: new Date(check_out_date),
            status,
            total_price
        };
        await bookingModel.addBooking(newBooking);
        await roomModel.updateRoom(room_id, { status: 'Đã đặt' }); // Update room status
        console.log("Booking handled successfully:", newBooking);
        res.json({ success: true });
    } catch (error) {
        console.error('Error during booking:', error);
        res.json({ success: false });
    }
};

exports.getBookingHistory = async (req, res) => {
    try {
        const customerId = req.session.customerId;
        const bookings = await bookingModel.getBookingsByCustomerId(customerId);
        res.render('bookings/bookingHistory', { bookings, customer: req.session.customer });
    } catch (error) {
        console.error('Error fetching booking history:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.renderBookingPaymentPage = (req, res) => {
    const { room_id, room_type, price } = req.query;
    const customerId = req.session.customerId;
    res.render('bookings/bookingPayment', { room_id, room_type, price, customerId, customer: req.session.customer });
};

exports.cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const booking = await bookingModel.getBookingById(bookingId);
        if (booking) {
            await bookingModel.updateBookingStatus(bookingId, 'Cancelled');
            await roomModel.updateRoom(booking.room_id, { status: 'Đang có sẵn' }); // Update room status
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.json({ success: false });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.getAllBookings();
        res.render('bookings/bookingList', { bookings });
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        res.status(500).send('Internal Server Error');
    }
};