const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/list', authMiddleware, userController.renderUserList);
router.delete('/delete/:id', authMiddleware, userController.deleteUser);

module.exports = router;