var express = require('express'),
    router = express.Router(),
    jwt = require('express-jwt');
    commandsFlowCommand = require('./commands/commandsFlow'),
    pushNotificationsCommand = require('./commands/pushNotificationsCommand'),
    wikipediaCommand = require('./commands/wikipediaCommand'),
    bookmarksCommand = require('./commands/bookmarksCommand'),
    interpreterCommand = require('./commands/interpreterCommand'),
    authenticationService = require('../services/authenticationService'),
    eventsService = require('../services/eventsService'),
    homeControlService = require('../services/homeControlService'),
    notificationService = require('../services/notificationService');


if (!process.env.SECRET)
    process.env.SECRET = "DEFAULT_SECRET"

var auth = jwt({
    secret: process.env.SECRET,
    userProperty: 'payload'
});



var ensureAuthenticated = function (req, res, next) {
    if (!req.payload._id) {
        res.send(401);
    }
    else next();
};


router.get('/help', function(req, res) {
    res.send([{
        name: 'command'
    }, {
        name: 'commandsFlow'
    }, {
        name: 'getWikipediaArticle'
    }, {
        name: 'getBookmarks'
    }, {
        name: 'interpretCommand'
    }, {
        name: 'pushNotification'
    }, {
        name: 'addBookmark'
    }, {
        name: 'deleteBookmark'
    }, {
        name: 'status'
    }]);
});
router.get('/status', function(req, res) {
    res.send("status OK");
});

router.get('/test', function(req, res) {
    res.send({
        test: 'OK'
    });
});
// authentication
//router.post('/register', authenticationService.register);
router.post('/login', authenticationService.login);
//router.post('/logout', function(req, res){ req.logOut();res.send(200); });
router.get('/testLogged', auth, ensureAuthenticated, function(req, res) {
    res.send("status OK");
});
router.get('/commandsFlow', commandsFlowCommand.getCommandsFlow);
router.get('/getWikipediaArticle/:title', wikipediaCommand.getWikipediaArticle);
router.get('/getBookmarks', ensureAuthenticated, bookmarksCommand.getBookmarks);
router.post('/interpretCommand', interpreterCommand.interpretCommand);
router.post('/pushNotification', pushNotificationsCommand.pushNotification);
router.post('/addBookmark', ensureAuthenticated, bookmarksCommand.addBookmark);
router.post('/deleteBookmark', bookmarksCommand.deleteBookmark);
router.get('/getTemperature', homeControlService.getTemperature);
router.get('/getLuminance', homeControlService.getLuminance);
router.get('/getDoorStatus', homeControlService.getDoorStatus);
router.get('/getEvents', eventsService.getEvents);

// profile
//router.get('/profile', auth, ctrlProfile.profileRead);

module.exports = router;