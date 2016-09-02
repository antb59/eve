var express = require('express'),
    mongoose = require('mongoose'),
    passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy,
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    logger = require('morgan'),
    multer = require('multer'),
    usersController = require('./server/controllers/usersController'),
    zwaveService = require('./server/services/zwaveService'),
    commandsFlowCommand = require('./server/routes/commands/commandsFlow'),
    pushNotificationsCommand = require('./server/routes/commands/pushNotificationsCommand'),
    wikipediaCommand = require('./server/routes/commands/wikipediaCommand'),
    bookmarksCommand = require('./server/routes/commands/bookmarksCommand'),
    interpreterCommand = require('./server/routes/commands/interpreterCommand'),
    path = require('path'),
    log = require('custom-logger').config({ level: 0 });


console.log('Starting Server...');

var app = express();

app.use(favicon(__dirname + '/icon.png'));
app.set('views', __dirname + '/www/templates');
app.set('view engine', 'ejs');
app.use(cookieParser() );
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//app.use(multer());
app.use(methodOverride());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'www')));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));
app.use(session({
    secret: 'SecretKeyForSessionManagement',
    name: 'eve',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);

passport.serializeUser(function(user, done) {
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    usersController.findById(id, function(err, user) {
        done(err, user);
    })
})

var ensureAuthenticated = function (req, res, next) {
    if (!req.isAuthenticated()) 
        res.send(401); 
    else next();
}



passport.use('login', new LocalStrategy(function(username, password, done) {
    usersController.login(username, password, function(err, userFound) {
        console.log("Login attempt");
        if (err) {
            return done(err);
        }
        if (!userFound) {
            return done(null, false, {
                message: 'Login Failed'
            });
        }
        else {
            return done(null, userFound);
        }
    })
}));



app.get('/api/help', function(req, res) {
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
app.get('/api/status', function(req, res) {
    res.send("status OK");
});

app.get('/api/test', function(req, res) {
    res.send({
        test: 'OK'
    });
});
app.get('/api/loggedin', function(req, res) { res.send(req.isAuthenticated() ? req.user : '0'); });
app.get('/api/testAccess', ensureAuthenticated, function(req, res) { res.send('Access allowed'); });
app.post('/api/login', passport.authenticate('login'), function(req, res) {res.send(200);});
//app.post('/api/login', function(req, res) {res.send(200);});
app.post('/api/logout', function(req, res){ req.logOut();res.send(200); });
app.get('/api/commandsFlow', commandsFlowCommand.getCommandsFlow);
app.get('/api/getWikipediaArticle/:title', wikipediaCommand.getWikipediaArticle);
app.get('/api/getBookmarks', ensureAuthenticated, bookmarksCommand.getBookmarks);
app.post('/api/interpretCommand', interpreterCommand.interpretCommand);
app.post('/api/pushNotification', pushNotificationsCommand.pushNotification);
app.post('/api/addBookmark', ensureAuthenticated, bookmarksCommand.addBookmark);
app.post('/api/deleteBookmark', bookmarksCommand.deleteBookmark);
app.get('/api/getTemperature', zwaveService.getTemperature);
app.get('/api/getLuminance', zwaveService.getLuminance);
app.get('/api/getDoorStatus', zwaveService.getDoorStatus);
app.get('/', function(req, res){
    res.render('index');
});

/*app.get('/api/getTemperature', function(req, res) {
    zwaveService.getTemperature(function(err, temp){
        if (err) {
            res.send(err);
        }
        else {
            res.send({
                temperature: temp
            });
        }
    });
});*/


var port = process.env.PORT || 7778;
var ip = process.env.IP || "88.176.183.64";

var server = app.listen(port, function(){
    console.log('Express server listening on port ' + port);
});

mongoose.connect('mongodb://localhost' + '/data');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Failed to connect to database :'));
db.once('open', function callback() {
    console.log("Connection to database succeed")
});

zwaveService.init();


