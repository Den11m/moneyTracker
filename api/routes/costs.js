const express = require('express');
const mongoose = require('mongoose');
const moment = require("moment");
const router = express.Router();
const Users = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    const decoded = jwt.decode(req.headers.authorization);
    // console.log('decoded', decoded);
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
            const currentBudget = user.budgets.find((budget) => {
                return budget.date.start <= costDate && budget.date.end >= costDate;
            });
            const lastIndex = currentBudget.costs.length - 1;
            // if(moment(currentBudget.costs[lastIndex].date).valueOf() > period.start && moment(currentBudget.costs[lastIndex].date).valueOf() < period.end){
            res.status(201).json({
                Message: "Your cost saved",
                cost: currentBudget.costs[lastIndex],
                })
            // }
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
                    return moment(cost.date).valueOf() > period.start && moment(cost.date).valueOf() < period.end;
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
                costs: costs,
                query: req.query
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
        const budget = user.budgets.find(budget => {
          return budget.date.start <= moment().valueOf() 
          && budget.date.end >=  moment().valueOf();
        });
        budget.costs = budget.costs.filter(({id}) => id !== req.params.id);
        return user.save()
    })
    .then(user => {
        res.status(200).json({
            Message: 'Your cost deleted ',
            costId: req.params.id,
        })
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

// router.delete('/:id', (req, res, next) => {
//         console.log('req params', req.params);
//     Costs.findByIdAndRemove(req.params.id)
//         .exec()
//         .then(cost => {
//             res.status(200).json({
//                 Message: 'Your cost deleted ',
//                 costId: cost._id,
//             })
//         })
//         .catch(error => {
//             res.status(500).json(error)
//         })
// });

module.exports = router;