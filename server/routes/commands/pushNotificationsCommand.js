var querystring = require('querystring'),
    http = require('http');

exports.pushNotification = function(req, res){

    console.log("API POST pushNotification");
    console.log(req.body);

    var data = querystring.stringify({
        'email' : 'antb59@gmail.com',
        'notification[from_screen_name]': req.body.notification.title,
        'notification[message]': req.body.notification.message,
        'notification[icon_url]': 'http://eve.antb59.c9.io/img/eve_small.jpg'
    });

    var options = {
        host: 'boxcar.io',
        port: 80,
        path: '/devices/providers/shNKXYXvXQKdqnvh19w/notifications',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };
    
    try {
        var httpreq = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log("body: " + chunk);
            });
        });
        httpreq.write(data);
        httpreq.end();
        res.json({
            status: 200,
            message : 'Push notification sent'
        });
    }
    catch(err) {
        console.log("Err : " + err.message);
         res.json({
            status: 500,
            message : 'Error while sending push notification: ' + err.message
        });
    }
};