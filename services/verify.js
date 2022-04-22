//firestore database
const { getFirestore} = require('firebase-admin/firestore')
const db = getFirestore();

//package
const jwtDecode = require('jwt-decode');
const {nanoid} = require('nanoid');

//constant
const databaseConstant = require('../config/constant/database_constant')

//partical func
function checkUserData(userData, userDataFromDB) {
    if (userData.userName === userDataFromDB && userData.password === userDataFromDB.password) {
        return true;
    }
    return false;
}

//main func
async function verifyUserAcc(jwt) {
    //decode
    const userData = jwtDecode(jwt);
    //get user data from db
    const userDataFromDB = (await db.collection(databaseConstant.users).doc(userData.userName).get()).data();

    //account key
    const accountKey = nanoid();

    //check user data
    if (checkUserData(userData, userDataFromDB)) {
        db.collection(databaseConstant.users).doc(userData.userName).update({
            statusObj:{
                accountKey: accountKey,
                expire: Date.now() + 86400000
            }
        })
    }

    return accountKey
}

module.exports = {
    verifyUserAcc
}