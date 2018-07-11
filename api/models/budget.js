let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let costSchema = require("./cost");

let Budget = new Schema(
    {
        value: {type: Number, required: true},
        costs: [costSchema],
        date: {
            start: {type: Date, required: true},
            end: {type: Date, required: true},
        },
        // spendPerDay: {type: Number, required: true},
    },
    {
        versionKey: false
    }
);
Budget.virtual('fact').get(function () {
    debugger;
    return this.costs;
});

module.exports = Budget;


