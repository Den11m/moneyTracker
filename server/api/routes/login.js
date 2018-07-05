const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const {secret} = require('../config/index');
const User = require('../models/user');

router.post('/', function (req, res, next) {
    User
        .findOne({email: req.body.email})
        .exec()
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    // console.log(req.body.password)
                    // console.log(user.password)
                    // console.log(user)
                    if (!result) {
                        res.status(401).json({
                            message: "wrong password"
                        })
                    } else {
                        const token = jsonwebtoken.sign({email: user.email, _id: user._id, login: user.login}, secret)
                        res.status(200).json({
                            message: 'Congratulation! login right',
                            userToken: token
                        })

                    }
                })
            } else {
                return res.status(400).json({
                    message: "User is not registered"
                })
            }
        })
});

module.exports = router;