require('dotenv').config();
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
const winston = require('winston');
const expressWinston = require("express-winston");
const express = require('express');
const cors = require('cors');
const app = express();

//auth firebase account
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//import route
const verify = require('./api/verify')

app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin:"*"
}));

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            format : winston.format.combine(
                winston.format.timestamp(),
                winston.format.prettyPrint()
            ),
        })
    ],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

//route
app.use(`/api/${process.env.VERSION}`,verify);

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
});