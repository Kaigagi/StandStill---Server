const express = require('express');
const router = express.Router();

//middleware
const checkAccessKey = require('../middleware/checkAccessKey')

//service func
const {verifyUserAcc} = require('../services/verify')

router.post('/verify',checkAccessKey,async (req, res) =>{
    try {
        // business logic
        const result = await verifyUserAcc(req.body.jwt);

        return res.status(200).json({
            msg:"login success",
            body: {
                accountKey: result,
            }
        })
    } catch (error) {
        console.log(error.message)
        if (error.message === "wrong email or password") {
            return res.status(400).json({
                msg:"wrong email or password"
            })
        }

        return res.status(500).json({
            msg:"something went wrong",
            cause: error.message
        })
    }
});

module.exports = router;