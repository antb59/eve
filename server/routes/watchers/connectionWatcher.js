var querystring = require('querystring'),
    dns = require('dns');


exports.isConnected =  function(callback,error) {

    console.log("API GET checkConnection");

    dns.resolve('www.google.com', function(err) {
        if (err)
            error(); 
        else
            callback();
    });

};






