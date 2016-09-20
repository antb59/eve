//https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/PAYLOAD.md#use-of-content-available-true
var gcm = require('node-gcm'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.notifyAllUsers = function(title, message, callback){
    User.find({}, function(err,users) {
        if (err) {
            console.error("Unable to notifyAllUsers : " + err);
        }
        else {
            this.notifyUsers(title, message, users, callback);
        }
    });
};

exports.notifyUsers = function(title, message, users, callback) {
    var tokens = [];
    for (var user in users) {
        if (user.deviceToken)
            tokens.push(user.deviceToken);
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
        message.addData('message', message);
        message.addData('ledColor', [255, 255, 255, 255]);
        message.addData('style', 'inbox');
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


exports.testNotifications = function(req, res) {

    console.log("testNotifications");

    var requestOptions = {
        proxy: 'http://proxy-internet.localnet:3128',
        timeout: 1000
    };

    var sender = new gcm.Sender(process.env.ANDROID_SERVER_API_KEY,requestOptions);

    /*var message = new gcm.Message({
        priority: 'high',
        content_available: 'true',

        data: {
            key1: 'message1',
            key2: 'message2'
        },
        notification: {
            title: "Titre de notification",
            body: "Message de notification " + Math.random(),
        }
    });




    sender.send(message, { registrationTokens: ['fSIAxBrw17E:APA91bFjwexAw7mT57GkIo3qY0tZj9BJ2AXccjuTonq8Gpz9rWFSsDx27MNjy3uDfrFXXBb930yky5btvhK8-mNL6mZE87fylzoCqHCsyDfiGWutIulDpSC8ckQND8wPa-E6KbMAtOhF'] }, function (errSend, response) {
        if(errSend) {
            console.error(errSend);
            res.json({
                status: 500,
                message: errSend
            });
        }
        else {
            res.json({
                status: 200,
                message: response
            });
        }
    });*/

    var message = new gcm.Message();
    message.addData('title', 'Big Picture');
    message.addData('message', 'This is my big picture message');
    message.addData('ledColor', [255, 255, 255, 255]);
    /*message.addData('style', 'picture');
    message.addData('picture', 'http://36.media.tumblr.com/c066cc2238103856c9ac506faa6f3bc2/tumblr_nmstmqtuo81tssmyno1_1280.jpg');
    message.addData('summaryText', 'The internet is built on cat pictures');*/
    sender.send(message, { registrationTokens: [ 'fSIAxBrw17E:APA91bFjwexAw7mT57GkIo3qY0tZj9BJ2AXccjuTonq8Gpz9rWFSsDx27MNjy3uDfrFXXBb930yky5btvhK8-mNL6mZE87fylzoCqHCsyDfiGWutIulDpSC8ckQND8wPa-E6KbMAtOhF' ] }, function (err, response) {
        if(err) {
            console.error(err);
            res.json({
                status: 500,
                message: err
            });
        }
        else {
            res.json({
                status: 200,
                message: response
            });
        }
    });

};
