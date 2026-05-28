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

exports.getAllUsers = async () => {
    const collection = await connectToDatabase();
    const users = await collection.find({}).toArray();
    return users;
};

exports.getUserById = async (id) => {
    const collection = await connectToDatabase();
    const user = await collection.findOne({ customer_id: id });
    return user;
};

exports.deleteUser = async (id) => {
    const collection = await connectToDatabase();
    await collection.deleteOne({ customer_id: id });
};