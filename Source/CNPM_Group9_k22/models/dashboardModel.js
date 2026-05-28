// Mock data for dashboard statistics
exports.getDashboardStats = async () => {
    return {
        dailyStats: await exports.getDailyStats(),
        roomStats: await exports.getRoomStats(),
        revenueStats: await exports.getRevenueStats()
    };
};

exports.getDailyStats = async () => {
    return {
        dailyRevenue: 15000000,
        checkIns: 20, 
        occupiedRooms: 45,
        occupancyRate: 75
    };
};

exports.getRoomStats = async () => {
    return {
        labels: ['Deluxe', 'Standard', 'Suite', 'Family', 'Single'],
        data: [30, 50, 20, 25, 10]
    };
};

exports.getRevenueStats = async () => {
    return {
        months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        revenue: [12000000, 15000000, 18000000, 20000000, 22000000, 25000000]
    };
};