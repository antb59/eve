var express = require('express'),
    mongoose = require('mongoose'),
    passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy,
    usersController = require('./server/controllers/usersController'),
    commandsFlowCommand = require('./server/routes/commands/commandsFlow'),
    pushNotificationsCommand = require('./server/routes/commands/pushNotificationsCommand'),
    wikipediaCommand = require('./server/routes/commands/wikipediaCommand'),
    bookmarksCommand = require('./server/routes/commands/bookmarksCommand'),
    interpreterCommand = require('./server/routes/commands/interpreterCommand'),
    path = require('path');

console.log('Starting Server...');

var app = express();

app.configure(function() {
    app.use(express.favicon());
    app.set('views', __dirname + '/client/views');
    app.set('view engine', 'ejs');
    app.use(express.cookieParser() );
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, 'client')));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    app.use(express.session({secret: 'SecretKeyForSessionManagement'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
});

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

passport.use(new LocalStrategy(function(username, password, done) {
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

app.get('/api/loggedin', function(req, res) { res.send(req.isAuthenticated() ? req.user : '0'); });
app.post('/api/login', passport.authenticate('local'), function(req, res) {res.send(200);});
app.post('/api/logout', function(req, res){ req.logOut();res.send(200); });
app.get('/api/commandsFlow', commandsFlowCommand.getCommandsFlow);
app.get('/api/getWikipediaArticle/:title', wikipediaCommand.getWikipediaArticle);
app.get('/api/getBookmarks', ensureAuthenticated, bookmarksCommand.getBookmarks);
app.post('/api/interpretCommand', interpreterCommand.interpretCommand);
app.post('/api/pushNotification', pushNotificationsCommand.pushNotification);
app.post('/api/addBookmark', ensureAuthenticated, bookmarksCommand.addBookmark);
app.post('/api/deleteBookmark', bookmarksCommand.deleteBookmark);
app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

app.listen(process.env.PORT, process.env.IP);
console.log('Listening on port ' + process.env.PORT + '...');


mongoose.connect('mongodb://' + process.env.IP + '/data');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Connection to database succeed")
});
