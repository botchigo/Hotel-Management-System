const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://thanhhuynguyen908:123@cluster0.bnc7f.mongodb.net/";
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        const database = client.db("HotelManagement");
        const collection = database.collection("Customers");
        return collection;
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
}

exports.addCustomer = async (newCustomer) => {
    const collection = await connectToDatabase();
    const result = await collection.insertOne(newCustomer);
    console.log("Add customer successfully", newCustomer);
    return result.insertedId;
};

exports.getCustomerByEmail = async (email) => {
    const collection = await connectToDatabase();
    const customer = await collection.findOne({ email });
    console.log(`Get customer by email ${email} successfully`);
    return customer;
};