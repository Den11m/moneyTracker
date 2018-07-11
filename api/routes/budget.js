const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Budget = require('../models/budget');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
     const decoded = jwt.decode(req.headers.authorization);
     console.log('decoded', decoded);
     const newBudget = new Budget({
            _id: new mongoose.Types.ObjectId(),
            userId: decoded._id,
            plan: req.body.plan,
            fact: req.body.fact,
            date: req.body.date,
            spendPerDay: req.body.spendPerDay,
          })
          .save()
          .then(budget => {
               res.status(201).json({
                    Message: "Your budget saved",
                    budget: budget,
               })

          })
          .catch(error => {
               res.status(500).json(error) //ошибки сервера статус 500 и выше
          })
});
router.get('/', (req, res, next) => {
     const decoded = jwt.decode(req.headers.authorization);

     Budget.find({
               userId: decoded._id
          })
          .exec()
          .then(collect => {
               res.status(200).json({
                    Message: 'Your collection budgets',
                    budgets: collect
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
