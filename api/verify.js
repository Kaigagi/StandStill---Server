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

        return res.status(200).send({
            msg:"login success",
            body: {
                accountKey: result,
            }
        })
    } catch (error) {
        if (error.message === "wrong email or password") {
            return res.status(400).json({
                msg:"wrong email or password"
            })
        }
    }
});

module.exports = router;