const dashboardModel = require('../models/dashboardModel');

exports.getDashboard = async (req, res) => {
    try {
        const stats = await dashboardModel.getDashboardStats();
        res.render('dashboard/dashboard', { stats });
    } catch (error) {
        console.error("Error getting dashboard:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getStats = async (req, res) => {
    try {
        const stats = await dashboardModel.getDailyStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRoomStats = async (req, res) => {
    try {
        const stats = await dashboardModel.getRoomStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRevenueStats = async (req, res) => {
    try {
        const stats = await dashboardModel.getRevenueStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};