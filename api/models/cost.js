let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Cost = new Schema({
     _id: mongoose.Schema.Types.ObjectId,
     userId: {
          type: String,
          require: true
     },
     cost: {
          type: Number,
          require: true
     },
     date: {
          type: Number,
          require: true
     },
     category: {
          type: String,
          require: true
     },
     comments: {
          type: String,
          require: true
     },
}, {
     versionKey: false
})

module.exports = mongoose.model('Cost', Cost);