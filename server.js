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
    morgan = require('morgan'),
    multer = require('multer'),
    path = require('path'),
    https = require('https'),
    crypto = require('crypto'),
    fs = require('fs'),
    moment = require('moment'),
    FileStreamRotator = require('file-stream-rotator'),
    winston = require('winston'),
    translationService = require('./server/services/translationService'),
    databaseService = require('./server/services/databaseService'),
    passportService = require('./server/services/passportService'),
    eventsService = require('./server/services/eventsService'),
    homeControlService = require('./server/services/homeControlService'),
    notificationService = require('./server/services/notificationService'),
    serverRoutes = require('./server/routes/routes');


winston.loggers.add('server', {
    file: {
        filename: 'logs/server.log'
    }
});
winston.loggers.get('server').remove(winston.transports.Console);
var serverLog = winston.loggers.get('server');

serverLog.info('Starting Server...');

var app = express();

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


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

var logDirectory = path.join(__dirname, '/logs');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

app.use(passport.initialize());

/*********************** ROUTES **************************************/
app.use('/api', serverRoutes);

app.get('/', function(req, res){
    res.render('index');
});

app.use(express.static(path.join(__dirname, 'www')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});


// development error handler
// will print stacktrace
if (process.env.ENV === 'DEV') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    serverLog.error("Erreur [" + err.status + "]" + err.message);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


/**************************************************************************/

var port = process.env.PORT || 7778;

https.createServer(options, app).listen(port, function(){
    serverLog.info('Express server listening on port ' + port);
    eventsService.store('EVE','SERVER STARTED');
    var notifMsg = moment().format('HH:mm:ss') + ' - ' + translationService.translate('SERVER_STARTED');
    notificationService.notifyAllUsers(translationService.translate('SERVER_STARTED'), notifMsg, function(err,response){});
});

homeControlService.init();


