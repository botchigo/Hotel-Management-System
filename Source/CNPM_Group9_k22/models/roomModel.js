const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://thanhhuynguyen908:123@cluster0.bnc7f.mongodb.net/";
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        const database = client.db("HotelManagement");
        const collection = database.collection("Rooms");
        return collection;
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
}

exports.getAllRooms = async () => {
    const collection = await connectToDatabase();
    const rooms = await collection.find({}).toArray();
    console.log("Get all rooms successfully");
    return rooms;
};

exports.getRoomById = async (id) => {
    const collection = await connectToDatabase();
    const room = await collection.findOne({ room_id: id });
    console.log(`Get room by ID ${id} successfully`);
    return room;
};

exports.addRoom = async (newRoom) => {
    const collection = await connectToDatabase();
    const result = await collection.insertOne(newRoom);
    console.log("Add room successfully");
    return result.insertedId;
};

exports.updateRoom = async (id, updatedRoom) => {
    const collection = await connectToDatabase();
    const result = await collection.updateOne({ room_id: id }, { $set: updatedRoom });
    console.log(`Update room ID ${id} successfully`);
    return result.modifiedCount;
};

exports.deleteRoom = async (id) => {
    const collection = await connectToDatabase();
    const result = await collection.deleteOne({ room_id: id });
    console.log(`Delete room ID ${id} successfully`);
    return result.deletedCount;
};