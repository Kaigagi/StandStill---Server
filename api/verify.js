const express = require('express');
const router = express.Router();

//middleware
const checkApiKey = require('../middleware/checkApiKey')

//constant
const headerConstant = require('../config/constant/header_constant')

//service func
const {verifyUserAcc, verifyAccountKey} = require('../services/verify')

router.post('/verify',checkApiKey,async (req, res) =>{
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

router.post('/verify/account-key',checkApiKey,async (req, res)=>{
    try {
        //business login
        const result = await verifyAccountKey(req.get(headerConstant.ACCOUNT_KEY))

        return res.status(200).json({
            msg:"verify success",
        });
    } catch (error) {
        if (error.message === "account key not valid") {
            return res.status(400).json({
                msg: error.message
            })
        }
    }
})

module.exports = router;