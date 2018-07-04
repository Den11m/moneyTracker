const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cost = require('../models/cost');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
     const decoded = jwt.decode(req.headers.authorization);
     console.log('decoded', decoded)
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
})
router.get('/', (req, res, next) => {
     Cost.find({
          // const decoded = jwt.decode(req.headers.authorization);

     })
})
module.exports = router;