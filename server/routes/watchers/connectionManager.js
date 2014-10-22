var querystring = require('querystring'),
    dns = require('dns'),
    http = require('http'),
    sh = require('shelljs');


var networkConfigEve = "/etc/network/interfaces.mh";
var networkConfigPirateBox = "/etc/network/interfaces.piratebox";
var networkConfig = "/etc/network/interfaces.ABE";

exports.isConnected =  function(callback,error) {

    console.log("API GET checkConnection");

    dns.resolve('mypi.dnsdynamic.net', function(err) {
        if (err)
            error(); 
        else {
            http.get("http://mypi.dnsdynamic.net:7777", function(res) {
                console.log("Got response: " + res.statusCode);
                error();
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
        var cp = sh.exec('sudo cp -p ' + networkConfigPirateBox + ' ' + networkConfig, {silent:false}).output;
        console.log("Copy result : " + cp);
        restartConnection();
        callback();
    }
};

exports.switchEveMode =  function(callback,error) {

    console.log("Switch to Eve Mode");

    if (!sh.test('-e', networkConfigEve)) {
        console.log("File [" + networkConfigEve + "] does not exist, abort switching to Eve mode");
        error();
    }
    else {
        var cp = sh.exec('sudo cp -p ' + networkConfigEve + ' ' + networkConfig, {silent:false}).output;
        console.log("Copy result : " + cp);
        restartConnection();
        callback();
    }
};

exports.restartConnection =  function() {
    var networkRestart = sh.exec('sudo ifdown eth0', {silent:false}).output;
    console.log("ifdown eth0 result : " + networkRestart);
    networkRestart = sh.exec('sudo ifdown wlan0', {silent:false}).output;
    console.log("ifdown wlan0 result : " + networkRestart);
    networkRestart = sh.exec('sudo ifup eth0', {silent:false}).output;
    console.log("ifup eth0 result : " + networkRestart);
    networkRestart = sh.exec('sudo ifup wlan0', {silent:false}).output;
    console.log("ifup wlan0 result : " + networkRestart);
};






