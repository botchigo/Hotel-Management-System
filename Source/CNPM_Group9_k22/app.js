const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const Handlebars = require('handlebars');
const moment = require('moment');

const app = express();

// Register Handlebars helpers
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});
Handlebars.registerHelper('includes', function (array, value) {
    return Array.isArray(array) && array.includes(value);
});
Handlebars.registerHelper('subtract', function (a, b) {
    return a - b;
});
Handlebars.registerHelper('add', function (a, b) {
    return a + b;
});
Handlebars.registerHelper('json', function (context) {
    return JSON.stringify(context);
});
Handlebars.registerHelper('formatDate', function (date) {
    return moment(date).format('YYYY-MM-DD');
});

// Set up Handlebars
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Customer Info Middleware
const customerInfoMiddleware = require('./middlewares/customerInfoMiddleware');
app.use(customerInfoMiddleware);

// Routes
const roomRoutes = require('./routes/roomRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const discountRoutes = require('./routes/discountRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const customerRoomRoutes = require('./routes/customerRoomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const bookingHistoryRoutes = require('./routes/bookingHistoryRoutes');

app.use('/rooms', roomRoutes);
app.use('/employees', employeeRoutes);
app.use('/discounts', discountRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/customer-rooms', customerRoomRoutes);
app.use('/bookings', bookingRoutes);
app.use('/booking-history', bookingHistoryRoutes);

// Root route
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});