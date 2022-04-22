const express = require('express');
const router = express.Router();

//middleware
const checkAccessKey = require('../middleware/checkAccessKey')

//service func
const {verifyUserAcc} = require('../services/verify')

router.post('/verify',checkAccessKey,async (req, res) =>{
    // business logic
    const result = await verifyUserAcc(req.body.jwt);
    console.log(result)
    return res.status(200).send({
        msg:"login success",
        body: {
            accountKey: result,
        }
    })
});

module.exports = router;