//https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/PAYLOAD.md#use-of-content-available-true
var gcm = require('node-gcm'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.notifyAllUsers = function(title, msg, callback){
    User.find({}, function(err,users) {
        if (err) {
            console.error("Unable to notifyAllUsers : " + err);
        }
        else {
            notifyUsers(title, msg, users, callback);
        }
    });
};

var notifyUsers = exports.notifyUsers = function(title, msg, users, callback) {
    var tokens = [];
    var i;
    for (i = 0; i < users.length; i++) {
        if (users[i].deviceToken)
            tokens.push(users[i].deviceToken);
    }
    if (tokens.length == 0) {
        console.error("No token found for users list " + JSON.stringify(users));    
    }
    else {
        console.log("Tokens = " + tokens);
        var proxy = process.env.PROXY;
        var sender = new gcm.Sender(process.env.ANDROID_SERVER_API_KEY,{'proxy': proxy});

        var message = new gcm.Message();
        message.addData('title', title);
        message.addData('message', msg);
        message.addData('ledColor', [255, 255, 255, 255]);
        //message.addData('summaryText', 'There are %n% notifications');

        sender.send(message, { registrationTokens: tokens }, function (errSend, response) {
            if(errSend) {
                console.error(errSend);
                callback(errSend,null);
            }
            else {
                callback(null, response);
            }
        });
    }
};

