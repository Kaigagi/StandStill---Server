//firestore database
const { getFirestore} = require('firebase-admin/firestore')
const db = getFirestore();

//constant
const databaseConstant = require('../config/constant/database_constant')

//main function
async function getAllRooms() {
    const roomsArraySnapShot = await db.collection(databaseConstant.ROOMS).get()
    let roomsArray = [];
    roomsArraySnapShot.forEach((room)=>{
        roomsArray.push(room.data());
    })

    return roomsArray;
}

module.exports = {
    getAllRooms
}