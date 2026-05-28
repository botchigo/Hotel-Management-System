module.exports = (req, res, next) => {
    if (req.session.isCustomerLoggedIn && req.session.customer) {
        res.locals.customer = req.session.customer;
    }
    next();
};