var querystring = require('querystring'),
    http = require('http');

//---------------------------------------
// mini app
//---------------------------------------
var openConnections = [];
 
// simple route to register the clients
exports.getCommandsFlow =  function(req, res) {
    
    console.log("API GET commandsFlow");
    
    // set timeout as high as possible
    req.socket.setTimeout(Infinity);
 
    // send headers for event-stream connection
    // see spec for more information
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write('\n');
 
    // push this res object to our global variable
    openConnections.push(res);
 
    // When the request is closed, e.g. the browser window
    // is closed. We search through the open connections
    // array and remove this connection.
    req.on("close", function() {
        var toRemove;
        for (var j =0 ; j < openConnections.length ; j++) {
            if (openConnections[j] == res) {
                toRemove =j;
                break;
            }
        }
        openConnections.splice(j,1);
        console.log("Open Connections : " + openConnections.length);
    });
};


exports.pushCommand =  function(infoText) {
    
    console.log("API GET commandsFlow - push command");
    
    var msg = {};
    
    msg.info = infoText;
    // we walk through each connection
    openConnections.forEach(function(resp) {
        console.log("API GET commandsFlow - command pushed");
        var d = new Date();
        resp.write('id: ' + d.getMilliseconds() + '\n');
        resp.write('data:' + JSON.stringify(msg) +   '\n\n'); // Note the extra newline
    });
 
};






