const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Users = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    const decoded = jwt.decode(req.headers.authorization);
    console.log('decoded', decoded);
    Users.findOne({
        _id: decoded._id
    }).exec()
        .then((user) => {
            user.budgets.push(req.body);
            return user.save();
        })
        .then((user) => {
            const lastIndex = user.budgets.length - 1;
            res.status(201).json({
                Message: "Your budget saved",
                budget: user.budgets[lastIndex],
            })
        })
        .catch(error => {
            res.status(500).json(error) //ошибки сервера статус 500 и выше
        })
});
router.get('/', (req, res, next) => {
    const decoded = jwt.decode(req.headers.authorization);
    Users.findOne({
        _id: decoded._id
    })
        .exec()
        .then(user => {
            res.status(200).json({
                Message: 'Your collection budgets',
                budgets: user.budgets
            })
        })
        .catch(error => {
            res.status(500).json(error)
        })

});

router.delete('/:id', (req, res, next) => {
    console.log('req params', req.params);
    Budget.findByIdAndRemove(req.params.id)
        .exec()
        .then(budget => {
            res.status(200).json({
                Message: 'Your budget deleted ',
                budgetId: budget._id,
            })
        })
        .catch(error => {
            res.status(500).json(error)
        })
});
module.exports = router;
