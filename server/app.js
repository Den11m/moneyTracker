const express = require('express');
const app = express();
const path = require('path');
const loginRouter = require('./api/routes/login');
const signUpRouter = require('./api/routes/signup');
const costsRouter = require('./api/routes/costs');
const checkAuth = require('./api/middlewares/auth');

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') //разрешает доступ с любых клиентов к нашему серверу,'*'---все клиенты,
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization') //указываем какие хэдеры разрешенно поддержать -"стандартные headers node.js"
    next();
});

app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/costs', checkAuth, costsRouter);

app.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
    // res.send("Work!");
});

module.exports = app;