const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
//app.use(express.urlencoded());

app.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
    // res.send("Work!");
});

module.exports = app;
