const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cost = require('../models/cost');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
     const decoded = jwt.decode(req.headers.authorization);
     console.log('decoded', decoded);
     const newCost = new Cost({
               _id: new mongoose.Types.ObjectId(),
               userId: decoded._id,
               cost: req.body.cost,
               date: req.body.date,
               category: req.body.category,
               comments: req.body.comments,
          })
          .save()
          .then(cost => {
               res.status(201).json({
                    Message: "Your cost saved",
                    cost: cost,
               })

          })
          .catch(error => {
               res.status(500).json(error) //ошибки сервера статус 500 и выше
          })
});
router.get('/', (req, res, next) => {
     const decoded = jwt.decode(req.headers.authorization);

     Cost.find({
               userId: decoded._id
          })
          .exec()
          .then(collect => {
               res.status(200).json({
                    Message: 'Your collection costs',
                    costs: collect
               })
          })
          .catch(error => {
               res.status(500).json(error)
          })

});

router.delete('/:id', (req, res, next) => {
    console.log('req params', req.params);
    Cost.findByIdAndRemove(req.params.id)
          .exec()
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