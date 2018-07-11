const express = require('express');
const app = express();
const path = require('path');
const loginRouter = require('./api/routes/login');
const signUpRouter = require('./api/routes/signup');
const costsRouter = require('./api/routes/costs');
const budgetRouter = require('./api/routes/budget');
const checkAuth = require('./api/middlewares/auth');

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*') //разрешает доступ с любых клиентов к нашему серверу,'*'---все клиенты,
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization') //указываем какие хэдеры разрешенно поддержать -"стандартные headers node.js"

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH, PUT');
        return res.status(200).json({
            Message: 'It\'s okey',
        })
    }

    next();
});

app.use(express.static(path.join(__dirname,'client/build')));

app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/costs', checkAuth, costsRouter);
app.use('/budget', checkAuth, budgetRouter);

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname,'client/build/index.html'));
});

module.exports = app;
