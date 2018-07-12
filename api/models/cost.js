let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const moment = require("moment");

let Cost = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
     cost: {
          type: Number,
          required: true
     },
     date: {
          type: Date,
          default: moment().valueOf()
     },
     category: {
          type: String,
          required: true
     },
     comments: {
          type: String,
     }
}, {
     versionKey: false
});

module.exports = Cost;