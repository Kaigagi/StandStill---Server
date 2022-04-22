const express = require('express');
const router = express.Router();

router.use((req, res, next) =>{
    const accessKey = req.get('accessKey');
    if (accessKey === process.env.ACCESS_KEY) {
        return next();
    }

    return res.status(400).json("access not allowed")
});

module.exports = router;