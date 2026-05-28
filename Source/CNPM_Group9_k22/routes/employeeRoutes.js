const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, employeeController.getEmployeeList);
router.post('/add', authMiddleware, employeeController.postAddEmployee);
router.get('/edit/:id', authMiddleware, employeeController.getEditEmployee);
router.post('/edit/:id', authMiddleware, employeeController.postEditEmployee);
router.post('/delete/:id', authMiddleware, employeeController.postDeleteEmployee);
router.get('/schedule/:id', authMiddleware, employeeController.getEmployeeSchedule);
router.post('/schedule/update/:id', authMiddleware, employeeController.updateEmployeeSchedule);
router.get('/schedules', authMiddleware, employeeController.getAllSchedules);
router.post('/schedule/append/:id', authMiddleware, employeeController.appendEmployeeSchedule);

module.exports = router;