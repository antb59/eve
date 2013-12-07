var querystring = require('querystring'),
    bookmarksController = require('./../../controllers/bookmarksController'),
    commandsFlow = require('./commandsFlow');

exports.getBookmarks = function(req, res) {

    console.log("API GET bookmarks");
    commandsFlow.pushCommand("GET bookmarks tags=[" + req.query.tags + "]");

    console.log("req.query.tags = " + req.query.tags);

    try {
        if (req.query.tags) { 
            bookmarksController.findByAllTags(req.query.tags, function(err, results) {
                if (err) throw Error("Unable to get bookmarks");
                else {
                    res.json({
                        status: 200,
                        bookmarks: results
                    });
                }
            });
        }
        else {
            bookmarksController.list(function(err, results) {
                if (err) throw Error("Unable to get bookmarks");
                else {
                    res.json({
                        status: 200,
                        bookmarks: results
                    });
                }
            });
        }
    }
    catch (err) {
        console.log("Err : " + err.message);
        res.json({
            status: 500,
            message: 'Error while gettting bookmarks: ' + err.message
        });
    }

};

exports.getBookmarksByTag = function(req, res) {

    console.log("API GET bookmarksByTag");
    commandsFlow.pushCommand("GET bookmarksByTag '" + req.params.tag + "'");
    console.log("req.params.tag : " + req.params.tag);
    try {
        bookmarksController.findByTag(req.params.tag,function(err, results) {
            if (err) throw Error("Unable to get bookmarksByTag");
            else {
                res.json({
                    status: 200,
                    bookmarks: results
                });
            }
        });
    }
    catch (err) {
        console.log("Err : " + err.message);
        res.json({
            status: 500,
            message: 'Error while gettting bookmarksByTag: ' + err.message
        });
    }

};

exports.addBookmark = function(req, res) {

    console.log("API POST addBookmark");
    commandsFlow.pushCommand("POST addBookmark '" + req.body + "'");

    try {
        var label = req.body.bookmark.label;
        var url = req.body.bookmark.url;
        var tags = req.body.bookmark.tags;
        bookmarksController.save(label, url, tags, function(err, result) {
            if (err) throw Error("Unable to save bookmark");
            else {
                res.json({
                    status: 200,
                    bookmark: result
                });
            }
        });
    }
    catch (err) {
        console.log("Err : " + err.message);
        res.json({
            status: 500,
            message: 'Error while adding bookmark: ' + err.message
        });
    }

};

exports.deleteBookmark = function(req, res) {

    console.log("API POST deleteBookmark");
    commandsFlow.pushCommand("POST deleteBookmark '" + req.body + "'");

    try {
        var id = req.body.bookmark._id;
        if (!id)
            throw Error("Unable to delete bookmark : id undefined");
        bookmarksController.delete(id, function(err, result) {
            if (err) throw Error("Unable to delete bookmark");
            else {
                res.json({
                    status: 200,
                    bookmark: result
                });
            }
        });
    }
    catch (err) {
        console.log("Err : " + err.message);
        res.json({
            status: 500,
            message: 'Error while deleting bookmark: ' + err.message
        });
    }

};
