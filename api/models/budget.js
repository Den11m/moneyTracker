let mongoose = require("mongoose");
const moment = require("moment");
let Schema = mongoose.Schema;
let costSchema = require("./cost");

let Budget = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        value: {type: Number, required: true},
        costs: [costSchema],
        date: {
            start: {
                type: Date,
                default: moment().startOf('month').valueOf(),
            },
            end: {
                type: Date,
                default: moment().endOf('month').valueOf()
            },
        },
        // spendPerDay: {type: Number, required: true},
    },
    {
        versionKey: false,
        toObject: { virtuals: true},
        toJSON: { virtuals: true}
    }
);
Budget.virtual('fact').get(function () {
    return this.costs.reduce((sum, currentCost) => {
        return sum + currentCost.cost;
    }, 0);
});

module.exports = Budget;


