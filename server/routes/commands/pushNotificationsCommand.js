var querystring = require('querystring'),
    http = require('http');

exports.sendNotification = function(req, res){

    console.log("API send notification");
    console.log(req.body);
    console.log(req.body.notification);
    console.log(req.body.notification.title);
    console.log(req.body.notification.message);


    var data = querystring.stringify({
        'email' : 'antb59@gmail.com',
        'notification[from_screen_name]': req.body.notification.title,
        'notification[message]': req.body.notification.message,
        'notification[icon_url]': 'http://helena-test.antb59.c9.io/img/robot_eve.png'
    });

    var options = {
        host: 'boxcar.io',
        port: 80,
        path: '/devices/providers/O89HcibBYhhqUG49ipk3/notifications',
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
    }
    catch(err) {
        console.log("Err : " + err.message);
        res.status = 500;
        res.end("Error during pushNotification send");
    }
    res.status = 200;
    res.write("OK");
};