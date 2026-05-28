const employeeModel = require('../models/employeeModel');

exports.getEmployeeList = async (req, res) => {
    try {
        const employees = await employeeModel.getAllEmployees();
        res.render('employees/employeeList', { employees });
    } catch (error) {
        console.error("Error fetching employee list:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.postAddEmployee = async (req, res) => {
    try {
        const newEmployee = req.body;
        newEmployee.employee_id = `E${Date.now()}`; // Generate a unique employee_id
        await employeeModel.addEmployee(newEmployee);
        res.json({ success: true });
    } catch (error) {
        console.error("Error adding new employee:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getEditEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await employeeModel.getEmployeeById(employeeId);
        res.json(employee);
    } catch (error) {
        console.error("Error fetching employee details:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.postEditEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const updatedEmployee = req.body;
        await employeeModel.updateEmployee(employeeId, updatedEmployee);
        res.json({ success: true });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.postDeleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        await employeeModel.deleteEmployee(employeeId);
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getEmployeeSchedule = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await employeeModel.getEmployeeById(employeeId);
        res.render('employees/scheduleEmployee', { employee });
    } catch (error) {
        console.error("Error fetching employee schedule:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateEmployeeSchedule = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const schedule = req.body.schedule;
        await employeeModel.updateEmployeeSchedule(employeeId, schedule);
        res.json({ success: true });
    } catch (error) {
        console.error("Error updating employee schedule:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAllSchedules = async (req, res) => {
    try {
        const employees = await employeeModel.getAllEmployeesWithSchedules();
        res.render('employees/scheduleList', { employees });
    } catch (error) {
        console.error("Error fetching all schedules:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Add new controller function
exports.appendEmployeeSchedule = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const newSchedule = req.body.schedule;
        await employeeModel.appendEmployeeSchedule(employeeId, newSchedule);
        res.json({ success: true });
    } catch (error) {
        console.error("Error appending schedule:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};