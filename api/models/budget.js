let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Budget = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
      type: String,
      require: true
    },
    plan: {type: Number, required: true},
    fact: {type: Number, default: 0},
    date: {
      start: {type: Number, required: true},
      end: {type: Number, required: true},
    },
    spendPerDay: {type: Number, required: true},
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("Budget", Budget);
