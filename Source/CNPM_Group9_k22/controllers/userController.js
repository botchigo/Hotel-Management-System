const userModel = require('../models/userModel');

exports.renderUserList = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.render('users/userList', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(req.params.id);
        res.redirect('/users/list?message=User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
};