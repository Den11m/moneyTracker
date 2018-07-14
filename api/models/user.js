let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let budgetSchema = require('./budget');

const checkEmail = /.+@{1}.+\.{1}.+/i;

let userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String,
        required: true,
        unique: true,
        match: checkEmail
    },
    password: {type: String, required: true, unique: true},
    budgets: [budgetSchema]
}, {
    toObject: { virtuals: true},
    toJSON: { virtuals: true}
});

module.exports = mongoose.model('User', userSchema); /// verify "User" ?
