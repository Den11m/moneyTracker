const jwt = require('jsonwebtoken');
const {secret} = require('../')

module.exports = (req,res,next) => {
    try {
      const token = req.headers.authorization;
      jwt.verify(token, secret)
    }
    catch (e) {

    }
};
