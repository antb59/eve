var querystring = require('querystring'),
    dns = require('dns'),
    http = require('http'),
    sh = require('shelljs'),
    log = require('custom-logger').config({ level: 0 });


var networkConfigEve = "/etc/network/interfaces.mh";
var networkConfigPirateBox = "/etc/network/interfaces.piratebox";
var networkConfig = "/etc/network/interfaces";

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

    log.info("Switch to PirateBox Mode");

    if (!sh.test('-e', networkConfigPirateBox)) {
        log.info("File [" + networkConfigPirateBox + "] does not exist, abort switching to PirateBox mode");
        error();
    }
    else {
        var cp = sh.exec('sudo cp -p ' + networkConfigPirateBox + ' ' + networkConfig, {silent:false}).output;
        log.info("Copy result : " + cp);
        restartConnection();
        var hostapd = sh.exec('sudo hostapd -dd /etc/hostapd/hostapd.conf -B &', {silent:false}).output;
        log.info("hostapd result : " + hostapd);
        callback();
    }
};

exports.switchEveMode =  function(callback,error) {

    log.info("Switch to Eve Mode");

    if (!sh.test('-e', networkConfigEve)) {
        log.info("File [" + networkConfigEve + "] does not exist, abort switching to Eve mode");
        error();
    }
    else {
        var cp = sh.exec('sudo cp -p ' + networkConfigEve + ' ' + networkConfig, {silent:false}).output;
        log.info("Copy result : " + cp);       
        var killhostapd = sh.exec("ps -ef | grep hostapd | grep -v grep | awk '{print $2}' | xargs kill -9", {silent:false}).output;
        log.info("killhostapd result : " + killhostapd);
        restartConnection();
        callback();
    }
};

function restartConnection() {
    var networkRestart = sh.exec('sudo ifdown eth0', {silent:false}).output;
    log.info("ifdown eth0 result : " + networkRestart);
    networkRestart = sh.exec('sudo ifdown wlan0', {silent:false}).output;
    log.info("ifdown wlan0 result : " + networkRestart);
    networkRestart = sh.exec('sudo ifup eth0', {silent:false}).output;
    log.info("ifup eth0 result : " + networkRestart);
    networkRestart = sh.exec('sudo ifup wlan0', {silent:false}).output;
    log.info("ifup wlan0 result : " + networkRestart);
};







