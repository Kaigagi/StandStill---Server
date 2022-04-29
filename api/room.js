const express = require('express');
const router = express.Router();

//middleware
const checkApiKey = require('../middleware/checkApiKey')

//service func
const {getAllRooms} = require('../services/room');

router.get('/room/getRooms', checkApiKey, async (req,res)=>{
    try {
        const result = await getAllRooms();

        res.status(200).json({
            msg:"success",
            result: result,
        })
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;