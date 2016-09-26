//https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/PAYLOAD.md#use-of-content-available-true
var mongoose = require('mongoose'),
    eventModel = require('./../models/events.js');
    Event = mongoose.model('Event'),
    moment = require('moment'),
    winston = require('winston');
    
winston.loggers.add('events', {
    file: {
        filename: 'logs/events.log'
    }
});
winston.loggers.get('events').remove(winston.transports.Console);
var eventsLog = winston.loggers.get('events');


exports.store = function(pModule, pContent, callback){
    var event = new Event();
    event.datetime = new Date();
    event.module = pModule;
    event.content = pContent;
    event.save(function(err) {
        if (err) {
            eventsLog.error("Unable to store Event : " + err);
            if (callback) callback(err);
        }
        else {
            if (callback) callback(null);
        }
    });
};

var findEvents = exports.findEvents = function(pModule, beginDate, endDate, orderField, limit, callback) { 
    var req = '{ "module" : "' + pModule + '"';
    if (beginDate) {
        req += ', "datetime": {"$gte": "'+ beginDate + '"';
        if (endDate) {
            req += ', "$lt": "'+ endDate + '"';
        }
        req +='}';
    }
    else {
        if (endDate) 
            req += ', "datetime": {$lt": "'+ endDate + '";}';
    }    
    req += '}';

    Event.find(JSON.parse(req), {'_id': 0, 'datetime' :1, 'content': 1}, function(err,events) {
        if (err) {
            eventsLog.error("Unable to getEvents : " + err);
            if (callback) callback(err,null);
        }
        else {
            if (callback) callback(null, events);
        }
    });
};

exports.getEvents = function(req, res) {
    eventsLog.info("API GET Events");
    //commandsFlow.pushCommand("GET bookmarksByTag '" + req.params.tag + "'");
    if (!Event) {
        eventsLog.debug('Events are not loaded');
        res.status(501).send('Events are not loaded');
    }
    else {
        if (!req.query.module) {
            res.json({
                status: 422,
                message: 'Module is required'
            });
        }
        else {
            findEvents(req.query.module, req.query.beginDate, req.query.endDate, req.query.orderField, req.query.limit, function(err, events) {
                if (err) {
                    res.json({
                        status: 500,
                        message: 'Error while gettting events: ' + err
                    });
                } 
                else {
                    res.json({
                        status: 200,
                        events: events
                    });
                }
            });
        }
    }
};



