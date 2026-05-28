const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const customerAuthMiddleware = require('../middlewares/customerAuthMiddleware');

router.get('/', customerAuthMiddleware, roomController.getCustomerRoomList);

module.exports = router;