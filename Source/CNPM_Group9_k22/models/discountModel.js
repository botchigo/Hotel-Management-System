const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://thanhhuynguyen908:123@cluster0.bnc7f.mongodb.net/";
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        const database = client.db("HotelManagement");
        const collection = database.collection("Discounts");
        return collection;
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
}

exports.getPromotions = async (filters) => {
    const collection = await connectToDatabase();
    if (!collection) throw new Error("Failed to connect to database");
    const promotions = await collection.find(filters).toArray();
    console.log("Get promotions successfully");
    return promotions;
};

exports.addPromotion = async (newPromo) => {
    const collection = await connectToDatabase();
    if (!collection) throw new Error("Failed to connect to database");
    const result = await collection.insertOne(newPromo);
    console.log("Add promotion successfully", newPromo);
    return result.insertedId;
};

exports.deletePromotion = async (id) => {
    const collection = await connectToDatabase();
    if (!collection) throw new Error("Failed to connect to database");
    const result = await collection.deleteOne({ discount_id: id });
    console.log(`Delete promotion ID ${id} successfully`);
    return result.deletedCount;
};