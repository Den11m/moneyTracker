const jwt = require('jsonwebtoken');
const {secret} = require('../config/index');

module.exports = (req, res, next) => {
    try {
        console.log('TOKEN!', req.headers.authorization)
        const token = req.headers.authorization;
        req.auth = jwt.verify(token, secret);
        req.auth && console.log('Auth is successfull');
        next()
    }
    catch (err) {
        console.log(err);
        res.status(401).json({
            message: 'token invalid'
        })
    }
};