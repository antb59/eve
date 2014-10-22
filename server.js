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
    commandsFlowCommand = require('./server/routes/commands/commandsFlow'),
    pushNotificationsCommand = require('./server/routes/commands/pushNotificationsCommand'),
    wikipediaCommand = require('./server/routes/commands/wikipediaCommand'),
    bookmarksCommand = require('./server/routes/commands/bookmarksCommand'),
    interpreterCommand = require('./server/routes/commands/interpreterCommand'),
    connectionManager = require('./server/routes/watchers/connectionManager'),
    path = require('path'),
    sockjs = require('sockjs');



console.log('Starting Server...');

var connectionStatus = 'DISCONNECTED';
var connectionAttempt = 0;
const TIME_BETWEEN_CONNECTION_ATTEMPTS = 1000;
const CONNECTION_ATTEMPTS_LIMIT = 3;
const PIRATE_BOX_MODE_DURATION = 500000;


var app = express();

app.use(favicon(__dirname + '/client/img/eve_small.png'));
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');
app.use(cookieParser() );
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(multer());
app.use(methodOverride());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'client')));
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

var ensureTrue = function (req, res, next) {
    next();
}

var ensureConnected = function (req, res, next) {
    if (connectionStatus != "CONNECTED") {
        console.log("Not in connected mode");
        res.send(401);
    }
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

app.get('/api/test', ensureTrue, ensureConnected, function(req, res) {
    res.send({
        test: 'OK'
    });
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
    if (connectionStatus === "CONNECTED")
        res.render('eve/index', { title: 'Express' });
    else
        res.render('piratebox/piratebox', { title: 'PirateBox' });
});
app.post('/api/switchConnected', function(req, res){ connectionStatus = 'CONNECTED';res.send(200); });

var port = process.env.PORT || 7777;
var ip = process.env.IP || "localhost";

var server = app.listen(port, function(){
    console.log('Express server listening on port ' + app.get('port'));
});

mongoose.connect('mongodb://' + ip + '/data');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Connection to database succeed")
});

var connections = [];

var chat = sockjs.createServer();
chat.on('connection', function(conn) {
    connections.push(conn);
    var number = connections.length;
    conn.write("Welcome, User " + number);
    conn.on('data', function(message) {
        for (var ii=0; ii < connections.length; ii++) {
            connections[ii].write("User " + number + " says: " + message);
        }
    });
    conn.on('close', function() {
        for (var ii=0; ii < connections.length; ii++) {
            connections[ii].write("User " + number + " has disconnected");
        }
    });
});

chat.installHandlers(server, {prefix:'/chat'});


var checkConnection = function() {
    connectionManager.isConnected(
        function() {
            if (connectionStatus === "CONNECTED") {
                console.log("Still connected");
                connectionStatus = 'CONNECTED';
                connectionAttempt = 0;
                setTimeout(checkConnection,10000);
            }
            else {
                console.log("Connection status is now 'Connected'");
                connectionStatus = 'CONNECTED';
                connectionAttempt = 0;
                setTimeout(checkConnection,10000);
            }
        },
        function() {
            if (connectionAttempt < CONNECTION_ATTEMPTS_LIMIT) {
                console.log("Connection status is 'Disconnected'");
                connectionStatus = 'DISCONNECTED';
                connectionAttempt++;
                setTimeout(checkConnection,TIME_BETWEEN_CONNECTION_ATTEMPTS);
            }
            else {
                console.log("Connection attempts limit is reached");
                console.log("Switching to PirateBox mode");
                connectionManager.switchPirateBoxMode(
                    function() {
                        console.log("PirateBox mode successfully loaded");
                        setTimeout(connectionManager.switchEveMode(
                            function() {
                                console.log("Eve mode successfully loaded");
                            },
                            function() {
                                console.log("Error while switching into Eve mode");    
                            }
                        ),PIRATE_BOX_MODE_DURATION);
                    },
                    function() {
                        console.log("Error while switching into PirateBox mode");    
                    }
                );
            }
        }
    );
};

checkConnection();
