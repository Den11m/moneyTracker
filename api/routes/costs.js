const express = require('express');
const mongoose = require('mongoose');
const moment = require("moment");
const router = express.Router();
const Users = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    const decoded = jwt.decode(req.headers.authorization);
    console.log('decoded', decoded);
    const costDate = req.body.date || moment().valueOf();
    Users.findOne({
        _id: decoded._id
    }).exec()
        .then((user) => {
            const currentBudget = user.budgets.find((budget) => {
                return budget.date.start <= costDate && budget.date.end >= costDate;
            });
            currentBudget.costs.push(req.body);
            return user.save();
        })
        .then((user) => {
            res.status(201).json({
                Message: "Your cost saved",
                cost: user.budgets,
            })

        })
        .catch(error => {
            res.status(500).json(error) //ошибки сервера статус 500 и выше
        })
});
router.get('/', (req, res, next) => {
    const decoded = jwt.decode(req.headers.authorization);
    const defaultPeriod = { start: 0, end: Infinity};
    const {period = defaultPeriod, category = null} = req.query;
    Users.findOne({
        _id: decoded._id
    })
        .exec()
        .then((user) => {
            const costs = user.budgets
                .reduce((allCosts, budget) => {
                    return [...allCosts, ...budget.costs];
                }, [])
                .filter((cost) => {
                    return cost.date > period.start && cost.date < period.end;
                })
                .filter((cost) => {
                    if(!category) {
                         return true;
                    } else {
                        return cost.category === category;
                    }
                });
            
            res.status(200).json({
                Message: 'Your collection costs',
                costs: costs
            })
        })
        .catch(error => {
            res.status(500).json(error)
        })

});

router.delete('/:id', (req, res, next) => {
    const decoded = jwt.decode(req.headers.authorization);
    console.log('req params', req.params);
    Users.findOne({
        _id: decoded._id
    })
    .exec()
    .then((user) => {
        return user.budgets.find(budget => {
          return budget.date.start <= moment().valueOf()
          && budget.date.end >=  moment().valueOf();
        })
      })
    .then( budget => {
        budget.costs.findByIdAndRemove(req.params.id)
    })
    .then(cost => {
        res.status(200).json({
            Message: 'Your cost deleted ',
            costId: cost._id,
        })
    })
    .catch(error => {
        res.status(500).json(error)
    })
});
module.exports = router;