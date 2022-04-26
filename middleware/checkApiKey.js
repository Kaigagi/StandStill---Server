const express = require('express');
const router = express.Router();

const headerConstant = require('../config/constant/header_constant')

router.use((req, res, next) =>{
    const apiKey = req.get(headerConstant.API_KEY);
    if (apiKey === process.env.API_KEY) {
        return next();
    }

    return res.status(403).json("access not allowed")
});

module.exports = router;