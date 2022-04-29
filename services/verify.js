//firestore database
const { getFirestore} = require('firebase-admin/firestore')
const db = getFirestore();

//package
const jwtDecode = require('jwt-decode');
const {nanoid} = require('nanoid');

//constant
const databaseConstant = require('../config/constant/database_constant')

//partical func
/**
 * 
 * @param {{email: string, password: string}} userData 
 * @param {{email: string, password: string}} userDataFromDB 
 * @returns {boolean}
 * @description compare received data and data from db
 */
function checkUserData(userData, userDataFromDB) {
    if (userData.email === userDataFromDB.email && userData.password === userDataFromDB.password) {
        return true;
    }
    return false;
}

//main func
/**
 * 
 * @param {string} jwt 
 * @returns {string}
 * @description verify login data from user by decoding a jwt string
 */
async function verifyUserAcc(jwt) {
    //decode
    const userData = jwtDecode(jwt);
    //get user data from db
    const userDataFromDB = (await db.collection(databaseConstant.USERS).doc(userData.email).get()).data();
    if (userDataFromDB === null || userDataFromDB === undefined) {
        throw new Error('wrong email or password')
    }

    //account key
    const accountKey = nanoid();

    //check user data
    if (!checkUserData(userData, userDataFromDB)) {
        throw new Error('wrong email or password')
    }

    await db.collection(databaseConstant.USERS).doc(userData.email).update({
        statusObj:{
            accountKey: accountKey,
            expire: Date.now() + 43200000
        }
    })
    return accountKey
}

/**
 * 
 * @param {string} accountKey 
 * @returns {userObj}
 */
async function verifyAccountKey(accountKey) {
    let userDataFromDB;
    const userSnapShot =  await db.collection(databaseConstant.USERS).where('statusObj.accountKey','==',accountKey).get();
    if (userSnapShot.empty) {
        throw new Error("account key not valid");
    } 
    userSnapShot.forEach((doc)=>{
        userDataFromDB = doc.data();
        
    })
    if (userDataFromDB.statusObj.expire < Date.now()) {
        throw new Error("account key not valid");
    }
    return userDataFromDB;
}

module.exports = {
    verifyUserAcc,
    verifyAccountKey
}