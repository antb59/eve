var mongoose = require('mongoose');
// BRING IN YOUR SCHEMAS & MODELS
require('../models/users');
require('../models/events');


var eventsService = require('../services/eventsService');
var gracefulShutdown;
var dbURI = "mongodb://localhost/data";

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    var User = mongoose.model('User');
    var Event = mongoose.model('Event');
    eventsService.store('EVE','CONNECTED TO DATABASE');
    console.log('Mongoose connected to ' + dbURI);

    if (process.env.FIRST_TIME) {
        User.remove({},function(err) {
            if (err)
                console.log("Unable to remove all users : " + err);
            else {
                console.log("Users removed.");
                var newUser = new User();

                newUser.username = process.env.USER;

                newUser.setPassword(process.env.PWD);
                
                newUser.deviceToken = 'e7zxkcJKD2Q:APA91bHXHxkM8ylh-0SouBYXBGxSu0jy3DH9G6-CLaOi1SQHQ64gJySuniW2oMwqTpYXPOlV_E_8fUfkDcfXMV6EJveODIHso7SpDcVlTjUHHBDaryDSxbPDfYKuKgk89s7i0hYfDngr';

                newUser.save(function(err) {
                    var token;
                    token = newUser.generateJwt();

                    User.find({}, function(err,users) {
                        if (err)
                            console.log("Unable to remove all users : " + err);
                        else {
                            console.log("users = " + users);
                            console.log("User 'antoine' successfully created");
                        }
                    });
                });
            }
        });
        
        Event.remove({},function(err) {
            if (err)
                console.log("Unable to remove all events : " + err);
            else {
                console.log("Events removed.");
            }
        });
    }
    else {
        User.find({}, function(err,c) {
            if (err)
                console.log("Unable to count users : " + err);
            else {
                console.log("Number of existing users : " + c);
            }
        });
    }

});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

