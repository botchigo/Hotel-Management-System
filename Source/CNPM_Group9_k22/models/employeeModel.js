const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://thanhhuynguyen908:123@cluster0.bnc7f.mongodb.net/";
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        const database = client.db("HotelManagement");
        const collection = database.collection("Employees");
        return collection;
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
}

exports.getAllEmployees = async () => {
    const collection = await connectToDatabase();
    const employees = await collection.find({}).toArray();
    console.log("Get all employees successfully");
    return employees;
};

exports.getEmployeeById = async (id) => {
    const collection = await connectToDatabase();
    const employee = await collection.findOne({ employee_id: id });
    console.log(`Get employee by ID ${id} successfully`);
    return employee;
};

exports.addEmployee = async (newEmployee) => {
    const collection = await connectToDatabase();
    const result = await collection.insertOne(newEmployee);
    console.log("Add employee successfully", newEmployee);
    return result.insertedId;
};

exports.updateEmployee = async (id, updatedEmployee) => {
    const collection = await connectToDatabase();
    const result = await collection.updateOne({ employee_id: id }, { $set: updatedEmployee });
    console.log(`Update employee ID ${id} successfully`, updatedEmployee);
    return result.modifiedCount;
};

exports.deleteEmployee = async (id) => {
    const collection = await connectToDatabase();
    const result = await collection.deleteOne({ employee_id: id });
    console.log(`Delete employee ID ${id} successfully`);
    return result.deletedCount;
};

// Original function - for scheduleEmployee.hbs (replace schedule)
exports.updateEmployeeSchedule = async (employeeId, schedule) => {
    const collection = await connectToDatabase();
    await collection.updateOne(
        { employee_id: employeeId },
        { $set: { schedule: schedule } }
    );
};

// New function - for scheduleList.hbs (append schedule)
exports.appendEmployeeSchedule = async (employeeId, newSchedule) => {
    const collection = await connectToDatabase();
    const employee = await collection.findOne({ employee_id: employeeId });
    
    let updatedSchedule = [];
    if (employee && Array.isArray(employee.schedule)) {
        updatedSchedule = [...employee.schedule];
    }
    updatedSchedule.push(...newSchedule);

    await collection.updateOne(
        { employee_id: employeeId },
        { $set: { schedule: updatedSchedule } }
    );
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

exports.getAllEmployeesWithSchedules = async () => {
    const collection = await connectToDatabase();
    // Get all employees regardless of schedule
    const employees = await collection.find({}).toArray();
    // Initialize empty schedule array if it doesn't exist
    employees.forEach(employee => {
        if (!employee.schedule) {
            employee.schedule = [];
        }
    });
    return employees;
};