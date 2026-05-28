const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://thanhhuynguyen908:123@cluster0.bnc7f.mongodb.net/";
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        const database = client.db("HotelManagement");
        const collection = database.collection("Bookings");
        return collection;
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
}

exports.addBooking = async (booking) => {
    const collection = await connectToDatabase();
    const result = await collection.insertOne(booking);
    console.log("Booking added successfully:", booking);
    return result.insertedId;
};

exports.getBookingsByCustomerId = async (customerId) => {
    const collection = await connectToDatabase();
    const bookings = await collection.find({ customer_id: customerId }).toArray();
    console.log(`Get bookings by customer ID ${customerId} successfully`);
    return bookings;
};

exports.getBookingById = async (bookingId) => {
    const collection = await connectToDatabase();
    const booking = await collection.findOne({ booking_id: bookingId });
    console.log(`Get booking by ID ${bookingId} successfully`);
    return booking;
};

exports.updateBookingStatus = async (bookingId, status) => {
    const collection = await connectToDatabase();
    const result = await collection.updateOne({ booking_id: bookingId }, { $set: { status: status } });
    console.log(`Update booking status for ID ${bookingId} to ${status} successfully`);
    return result.modifiedCount;
};

exports.deleteBookingsByCustomerId = async (customerId) => {
    const collection = await connectToDatabase();
    const result = await collection.deleteMany({ customer_id: customerId });
    console.log(`Deleted ${result.deletedCount} bookings for customer ID ${customerId}`);
    return result.deletedCount;
};

exports.getAllBookings = async () => {
    const collection = await connectToDatabase();
    const bookings = await collection.find({}).toArray();
    console.log("Get all bookings successfully");
    return bookings;
};