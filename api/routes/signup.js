const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const {
    secret
} = require('../config/index');

const User = require('../models/user');

router.post('/', function (req, res, next) {
    User.findOne({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user) {
                res.status(200).json({
                    message: "there is a user already this email" // send this message to the user
                })
            } else {
                if (req.body.password) {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                login: req.body.login,
                                email: req.body.email,
                                password: hash,
                            })
                            return user.save()
                        })
                        .then(user => {
                            const token = jsonwebtoken.sign({
                                email: user.email,
                                _id: user._id,
                                login: user.login
                            }, secret)
                            // res.status(200).json({
                            //     message: 'Congratulation! login right',
                            //     userToken: token
                            // })
                            res.status(201).json({
                                message: 'user created successfully',
                                userToken: token
                            })

                        })
                        .catch(err => {
                            res.status(400).json(err)
                        })

                } else {
                    return res.status(404).json({
                        message: 'no password field'
                    })
                }

            }
        })

})

module.exports = router;