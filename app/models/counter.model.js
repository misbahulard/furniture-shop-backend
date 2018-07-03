var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({
    name: String,
    value: Number    
});

module.exports = mongoose.model('Counter', counterSchema, "counters");
