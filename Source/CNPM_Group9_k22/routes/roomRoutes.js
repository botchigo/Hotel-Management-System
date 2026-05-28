const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, roomController.getRoomList);
router.get('/add', authMiddleware, roomController.getAddRoom);
router.post('/add', authMiddleware, roomController.postAddRoom);
router.get('/edit/:id', authMiddleware, roomController.getEditRoom);
router.post('/edit/:id', authMiddleware, roomController.postEditRoom);
router.post('/delete/:id', authMiddleware, roomController.postDeleteRoom);

module.exports = router;