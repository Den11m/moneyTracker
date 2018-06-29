const express = require('express');
const app = express();
const path = require('path');
const loginRouter = require('./api/routes/login');
const signUpRouter = require('./api/routes/signup');

app.use(express.json());
app.use(express.urlencoded());

app.use('/login',loginRouter);
app.use('/signup', signUpRouter);

app.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
    // res.send("Work!");
});

module.exports = app;
