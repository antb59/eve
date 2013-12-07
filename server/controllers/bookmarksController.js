var querystring = require('querystring'),
    mongoose = require('mongoose'),
    bookmark = require('./../models/bookmark');

exports.list = function(callback) {
    var bookmarks;
    bookmark.find({}, function(err, bookmarks) {
        if (err) {
            console.log('Error during bookmark.find : ' + err);
            callback(err);
        }
        else {
            console.log("bookmarks: " + bookmarks);
            callback(err, bookmarks);
        }
    });
}

exports.findByTag = function(pTag, callback) {
    var bookmarks;
    bookmark.find({tags : pTag}, function(err, bookmarks) {
        if (err) {
            console.log('Error during bookmark.findByTags : ' + err);
            callback(err);
        }
        else {
            console.log("bookmarks for tag '" + pTag +"' : " + bookmarks);
            callback(err, bookmarks);
        }
    });
}

exports.findByAllTags = function(pTags, callback) {
    var bookmarks;
    bookmark.find({tags : { $all : pTags }}, function(err, bookmarks) {
        if (err) {
            console.log('Error during bookmark.findByAllTags : ' + err);
            callback(err);
        }
        else {
            console.log("bookmarks for all tags '" + pTags +"' : " + bookmarks);
            callback(err, bookmarks);
        }
    });
}

exports.save = function(pLabel, pUrl,pTags, callback) {
    var newBookmark = new bookmark({label: pLabel, url: pUrl, tags: pTags});
    newBookmark.save(function(err, newBookmark) {
        if (err) {
            console.log('Error during bookmark.save : ' + err);
            callback(err);
        }
        else {
            callback(err,newBookmark);            
        }
    });
}

exports.delete = function(pId, callback) {
    bookmark.findByIdAndRemove(pId,function(err, deletedBookmark) {
        if (err) {
            console.log('Error during bookmark.delete : ' + err);
            callback(err);
        }
        else {
            callback(err,deletedBookmark);            
        }
    });
}