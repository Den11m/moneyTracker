const jwt = require('jsonwebtoken');
const {secret} = require('../config/index');

module.exports = (req, res, next) => {
    try{
       const token =  req.headers.authorization;
       req.auth = jwt.verify(token, secret)


    }
    catch(err){}
};
