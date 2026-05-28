module.exports = (req, res, next) => {
    if (req.session.isCustomerLoggedIn) {
        next();
    } else {
        res.redirect('/login?message=Please log in to access this page');
    }
};