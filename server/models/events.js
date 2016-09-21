var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var eventSchema = new mongoose.Schema({
    datetime: {
        type: Date,
        required: true
    },
    module: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

mongoose.model('Event', eventSchema);
