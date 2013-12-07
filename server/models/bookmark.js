var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Bookmark = new Schema({
    label: String,
    url: String,
    tags: {type : [String]}
});

module.exports = mongoose.model('Bookmark', Bookmark);
