const roomModel = require('../models/roomModel');

exports.getRoomList = async (req, res) => {
    try {
        const rooms = await roomModel.getAllRooms();
        res.render('rooms/roomList', { rooms });
    } catch (error) {
        console.error("Error fetching room list:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getCustomerRoomList = async (req, res) => {
    try {
        const rooms = await roomModel.getAllRooms();
        res.render('rooms/customerRoomList', { 
            rooms,
            customerId: req.session.customerId,
            customer: req.session.customer
        });
    } catch (error) {
        console.error("Error fetching room list:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAddRoom = (req, res) => {
    res.render('rooms/roomAdd');
};

exports.postAddRoom = async (req, res) => {
    try {
        const newRoom = req.body;
        newRoom.room_id = `R${Date.now()}`; // Generate a unique room_id
        newRoom.amenities = Array.isArray(newRoom.amenities) ? newRoom.amenities : [newRoom.amenities]; // Ensure amenities is an array
        await roomModel.addRoom(newRoom);
        res.redirect('/rooms?success=Thêm phòng thành công');
    } catch (error) {
        console.error("Error adding new room:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getEditRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await roomModel.getRoomById(roomId);
        room.amenities = Array.isArray(room.amenities) ? room.amenities : []; // Ensure amenities is an array
        res.render('rooms/roomEdit', { room });
    } catch (error) {
        console.error("Error fetching room details:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.postEditRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const updatedRoom = req.body;
        updatedRoom.amenities = Array.isArray(updatedRoom.amenities) ? updatedRoom.amenities : [updatedRoom.amenities]; // Ensure amenities is an array
        await roomModel.updateRoom(roomId, updatedRoom);
        res.redirect(`/rooms/edit/${roomId}?success=Cập nhật phòng thành công`);
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.postDeleteRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        await roomModel.deleteRoom(roomId);
        res.redirect('/rooms?success=Xóa phòng thành công');
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).send("Internal Server Error");
    }
};