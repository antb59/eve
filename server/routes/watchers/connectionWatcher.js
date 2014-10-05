var querystring = require('querystring'),
    dns = require('dns'),
    http = require('http');


exports.isConnected =  function(callback,error) {

    console.log("API GET checkConnection");

    dns.resolve('mypi.dnsdynamic.net', function(err) {
        if (err)
            error(); 
        else {
            http.get("http://mypi.dnsdynamic.net:7777", function(res) {
                console.log("Got response: " + res.statusCode);
                callback();
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
                error(); 
            });
        }
    });

};






