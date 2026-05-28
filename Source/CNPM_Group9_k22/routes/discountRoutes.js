const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, discountController.renderPromotions);
router.post('/add', authMiddleware, discountController.addPromotion);
router.post('/delete/:id', authMiddleware, discountController.deletePromotion);

module.exports = router;