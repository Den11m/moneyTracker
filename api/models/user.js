let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let budgetSchema = require('./budget');

const checkEmail = /.+@{1}.\.{1}.+/gi;

let userSchema = new Schema({
    email: {type: String, require:  true, unique: true, match: checkEmail},
    password: {type: String, require: true, unique: true},
    budgets: [budgetSchema]
});

module.exports = mongoose.model('User', userSchema); /// verify "User" ?
