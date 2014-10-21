var querystring = require('querystring'),
    dns = require('dns'),
    http = require('http'),
    sh = require('shelljs');


var networkConfigPirateBox = "/etc/network/interfaces.piratebox";

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

exports.switchPirateBoxMode =  function(callback,error) {

    console.log("Switch to PirateBox Mode");

    if (!sh.test('-e', networkConfigPirateBox)) {
        console.log("File [" + networkConfigPirateBox + "] does not exist, abort switching to PirateBox mode");
        error();
    }
    else {
        var cp = sh.exec('cp -p ' + networkConfigPirateBox + ' /home/pi/testAbe', {silent:false}).output;
        console.log("Copy result : " + cp);
        callback();
    }
};






