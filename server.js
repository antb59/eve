var express = require('express'),
    commandsFlowCommand = require('./server/routes/commands/commandsFlow'),
    pushNotificationsCommand = require('./server/routes/commands/pushNotificationsCommand'),
    wikipediaCommand = require('./server/routes/commands/wikipediaCommand'),
    path = require('path');

console.log('Starting Server...')

var app = express();

app.configure(function () {
        app.use(express.favicon());
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
        app.use(express.logger('dev'));
        app.use(express.static(path.join(__dirname, 'client')));
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
});

app.get('/api/help', function(req, res) {
    res.send([{name:'command'}, {name:'status'}]);
});
app.get('/api/status', function(req, res) {
    res.send("status OK");
});

app.get('/api/commandsFlow', commandsFlowCommand.getCommandsFlow);
app.get('/api/getWikipediaArticle/:title', wikipediaCommand.getWikipediaArticle);
app.post('/api/pushNotification', pushNotificationsCommand.pushNotification);


app.listen(process.env.PORT,process.env.IP);
console.log('Listening on port ' + process.env.PORT + '...');
