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
    path = require('path'),
    log = require('custom-logger').config({ level: 0 });
    ZWave = require('openzwave-shared');



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

app.get('/api/test', function(req, res) {
    res.send({
        test: 'OK'
    });
});
app.get('/api/loggedin', function(req, res) { res.send(req.isAuthenticated() ? req.user : '0'); });
//app.post('/api/login', passport.authenticate('local'), function(req, res) {res.send(200);});
app.post('/api/login', function(req, res) {res.send(200);});
app.post('/api/logout', function(req, res){ req.logOut();res.send(200); });
app.get('/api/commandsFlow', commandsFlowCommand.getCommandsFlow);
app.get('/api/getWikipediaArticle/:title', wikipediaCommand.getWikipediaArticle);
app.get('/api/getBookmarks', ensureAuthenticated, bookmarksCommand.getBookmarks);
app.post('/api/interpretCommand', interpreterCommand.interpretCommand);
app.post('/api/pushNotification', pushNotificationsCommand.pushNotification);
app.post('/api/addBookmark', ensureAuthenticated, bookmarksCommand.addBookmark);
app.post('/api/deleteBookmark', bookmarksCommand.deleteBookmark);
app.get('/', function(req, res){
    res.render('index');
});


var port = process.env.PORT || 7778;
var ip = process.env.IP || "88.176.183.64";

var server = app.listen(port, function(){
    console.log('Express server listening on port ' + port);
});

mongoose.connect('mongodb://' + ip + '/data');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Failed to connect to database :'));
db.once('open', function callback() {
    console.log("Connection to database succeed")
});

var zwave = new ZWave({
        Logging: false,     // disable file logging (OZWLog.txt)
        ConsoleOutput: false // enable console logging
});

var nodes = [];

zwave.on('driver ready', function(homeid) {
    console.log('[ZWAVE][DRIVER READY]scanning homeid=0x%s...', homeid.toString(16));
});

zwave.on('driver failed', function() {
    console.log('[ZWAVE][DRIVER FAILED]failed to start driver');
    zwave.disconnect();
    process.exit();
});

zwave.on('node added', function(nodeid) {
    nodes[nodeid] = {
        manufacturer: '',
        manufacturerid: '',
        product: '',
        producttype: '',
        productid: '',
        type: '',
        name: '',
        loc: '',
        classes: {},
        ready: false,
    };
});

zwave.on('value added', function(nodeid, comclass, value) {
    if (!nodes[nodeid]['classes'][comclass])
        nodes[nodeid]['classes'][comclass] = {};
    nodes[nodeid]['classes'][comclass][value.index] = value;
});

zwave.on('value changed', function(nodeid, comclass, value) {
    if (nodes[nodeid]['ready']) {
        console.log('[ZWAVE][VALUE CHANGED]node%d: changed: %d:%s:%s->%s', nodeid, comclass,
                value['label'],
                nodes[nodeid]['classes'][comclass][value.index]['value'],
                value['value']);
    }
    nodes[nodeid]['classes'][comclass][value.index] = value;
});

zwave.on('value removed', function(nodeid, comclass, index) {
    if (nodes[nodeid]['classes'][comclass] &&
        nodes[nodeid]['classes'][comclass][index])
        delete nodes[nodeid]['classes'][comclass][index];
});

zwave.on('node ready', function(nodeid, nodeinfo) {
    nodes[nodeid]['manufacturer'] = nodeinfo.manufacturer;
    nodes[nodeid]['manufacturerid'] = nodeinfo.manufacturerid;
    nodes[nodeid]['product'] = nodeinfo.product;
    nodes[nodeid]['producttype'] = nodeinfo.producttype;
    nodes[nodeid]['productid'] = nodeinfo.productid;
    nodes[nodeid]['type'] = nodeinfo.type;
    nodes[nodeid]['name'] = nodeinfo.name;
    nodes[nodeid]['loc'] = nodeinfo.loc;
    nodes[nodeid]['ready'] = true;
    console.log('[ZWAVE][NODE READY] node%d: %s, %s', nodeid,
            nodeinfo.manufacturer ? nodeinfo.manufacturer
                      : 'id=' + nodeinfo.manufacturerid,
            nodeinfo.product ? nodeinfo.product
                     : 'product=' + nodeinfo.productid +
                       ', type=' + nodeinfo.producttype);
    console.log('[ZWAVE][NODE READY] node%d: name="%s", type="%s", location="%s"', nodeid,
            nodeinfo.name,
            nodeinfo.type,
            nodeinfo.loc);
    for (comclass in nodes[nodeid]['classes']) {
        switch (comclass) {
        case 0x25: // COMMAND_CLASS_SWITCH_BINARY
        case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
            zwave.enablePoll(nodeid, comclass);
            break;
        }
        var values = nodes[nodeid]['classes'][comclass];
        console.log('[ZWAVE][NODE READY] node%d: class %d', nodeid, comclass);
        for (idx in values)
            console.log('[ZWAVE][NODE READY] node%d:   %s=%s', nodeid, values[idx]['label'], values[idx]['value']);
    }
});

zwave.on('notification', function(nodeid, notif) {
    switch (notif) {
    case 0:
        console.log('[ZWAVE][NOTIFICATION] node%d: message complete', nodeid);
        break;
    case 1:
        console.log('[ZWAVE][NOTIFICATION] node%d: timeout', nodeid);
        break;
    case 2:
        console.log('[ZWAVE][NOTIFICATION] node%d: nop', nodeid);
        break;
    case 3:
        console.log('[ZWAVE][NOTIFICATION] node%d: node awake', nodeid);
        break;
    case 4:
        console.log('[ZWAVE][NOTIFICATION] node%d: node sleep', nodeid);
        break;
    case 5:
        console.log('[ZWAVE][NOTIFICATION] node%d: node dead', nodeid);
        break;
    case 6:
        console.log('[ZWAVE][NOTIFICATION] node%d: node alive', nodeid);
        break;
        }
});

zwave.on('scan complete', function() {
    console.log('[ZWAVE][SCAN COMPLETE] ====> scan complete, hit ^C to finish.');
    // set dimmer node 5 to 50%
    //zwave.setValue(5,38,1,0,50);
    //zwave.setValue( {node_id:5, class_id: 38, instance:1, index:0}, 50);
    // Add a new device to the ZWave controller
    if (zwave.hasOwnProperty('beginControllerCommand')) {
      // using legacy mode (OpenZWave version < 1.3) - no security
      zwave.beginControllerCommand('AddDevice', true);
    } else {
      // using new security API
      // set this to 'true' for secure devices eg. door locks
      zwave.addNode(false);
    }
});

zwave.on('controller command', function(r,s) {
    console.log('[ZWAVE][CONTROLLER COMMAND] controller commmand feedback: r=%d, s=%d',r,s);
});

zwave.connect('/dev/ttyACM0');

process.on('SIGINT', function() {
    console.log('[ZWAVE][SIGINT] disconnecting...');
    zwave.disconnect('/dev/ttyACM0');
    process.exit();
});


