const customerModel = require('../models/customerModel');
const bcrypt = require('bcrypt');

exports.renderLogin = (req, res) => {
    if (req.session.isManagerLoggedIn) {
        return res.redirect('/dashboard');
    }
    res.render('auth/login');
};

exports.handleLogin = async (req, res) => {
    const { role, username, managerPassword, customerPassword, email } = req.body;
    
    // Manager login - redirect to dashboard
    if (role === 'manager') {
        if (username === 'admin' && managerPassword === '123') {
            req.session.isManagerLoggedIn = true;
            return res.redirect('/dashboard');
        }
        return res.redirect('/login?message=Invalid manager credentials');
    }

    // Customer login - redirect to room list page
    if (role === 'customer') {
        try {
            const customer = await customerModel.getCustomerByEmail(email);
            
            if (!customer) {
                return res.redirect('/login?message=Customer not found');
            }

            const isPasswordValid = await bcrypt.compare(customerPassword, customer.password);
            
            if (isPasswordValid) {
                req.session.isCustomerLoggedIn = true;
                req.session.customerId = customer.customer_id;
                // Store only necessary customer info in session
                req.session.customer = {
                    customer_id: customer.customer_id,
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone
                };
                return res.redirect('/customer-rooms');
            }
            return res.redirect('/login?message=Invalid password');
        } catch (error) {
            console.error("Error during customer login:", error);
            return res.redirect('/login?message=Login error occurred');
        }
    }

    return res.redirect('/login?message=Invalid role');
};

exports.renderRegister = (req, res) => {
    res.render('auth/register');
};

exports.handleRegister = async (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.redirect('/register?message=Passwords do not match');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = {
            customer_id: `C${Date.now()}`,
            name,
            email,
            phone,
            password: hashedPassword,
            history: []
        };
        await customerModel.addCustomer(newCustomer);
        res.redirect('/login?message=Registration successful');
    } catch (error) {
        console.error("Error during registration:", error);
        res.redirect('/register?message=An error occurred');
    }
};

exports.handleLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};