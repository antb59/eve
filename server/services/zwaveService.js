var ZWave = require('openzwave-shared');

var nodes = [];
var temperature;


exports.init = function(callback) {
    var zwave = new ZWave({
        Logging: false,     // disable file logging (OZWLog.txt)
        ConsoleOutput: false, // enable console logging
        UserPath: "/home/pi/eve/eve/node_modules/openzwave-shared/config"
    });

    zwave.on('driver ready', function(homeid) {
        console.log('[ZWAVE][DRIVER READY]scanning homeid=0x%s...', homeid.toString(16));
    });

    zwave.on('driver failed', function() {
        console.log('[ZWAVE][DRIVER FAILED]failed to start driver');
        zwave.disconnect();
        process.exit();
    });

    zwave.on('node added', function(nodeid) {
        console.log('[ZWAVE][NODE ADDED]node%d', nodeid);
        nodes[nodeid] = {
            manufacturer: '',
            manufacturerid: '',
            product: '',
            producttype: '',
            productid: '',
            type: '',
            name: '',
            loc: '',
            classes: {},
            ready: false,
        };
    });

    zwave.on('value added', function(nodeid, comclass, value) {
        if (!nodes[nodeid]['classes'][comclass])
            nodes[nodeid]['classes'][comclass] = {};
        nodes[nodeid]['classes'][comclass][value.index] = value;
        console.log('[ZWAVE][%s][VALUE ADDED]node%d: added: %s:%s->%s',new Date(), nodeid, comclass,
                    value['label'],
                    nodes[nodeid]['classes'][comclass][value.index]['value'],
                    value['value']);
        if ((comclass == '49') && (value['label'] == 'Temperature')) {
            temperature = value;
        }
    });

    zwave.on('value changed', function(nodeid, comclass, value) {
        console.log('[ZWAVE][%s][VALUE CHANGED]node%d: changed: %s:%s->%s',new Date(), nodeid, comclass,
                    value['label'],
                    nodes[nodeid]['classes'][comclass][value.index]['value'],
                    value['value']);
        nodes[nodeid]['classes'][comclass][value.index] = value;
    });

    zwave.on('value removed', function(nodeid, comclass, index) {
        if (nodes[nodeid]['classes'][comclass] &&
            nodes[nodeid]['classes'][comclass][index])
            delete nodes[nodeid]['classes'][comclass][index];
    });

    zwave.on('node naming', function(nodeid, nodeinfo) {
        console.log('[ZWAVE][%s][NODE NAMING]node%d',new Date(), nodeid);
        console.log('[ZWAVE][NODE READY] node%d: %s, %s', nodeid,
                    nodeinfo.manufacturer ? nodeinfo.manufacturer
                    : 'id=' + nodeinfo.manufacturerid,
                    nodeinfo.product ? nodeinfo.product
                    : 'product=' + nodeinfo.productid +
                    ', type=' + nodeinfo.producttype);

    });


    zwave.on('node ready', function(nodeid, nodeinfo) {
        nodes[nodeid]['manufacturer'] = nodeinfo.manufacturer;
        nodes[nodeid]['manufacturerid'] = nodeinfo.manufacturerid;
        nodes[nodeid]['product'] = nodeinfo.product;
        nodes[nodeid]['producttype'] = nodeinfo.producttype;
        nodes[nodeid]['productid'] = nodeinfo.productid;
        nodes[nodeid]['type'] = nodeinfo.type;
        nodes[nodeid]['name'] = nodeinfo.name;
        nodes[nodeid]['loc'] = nodeinfo.loc;
        nodes[nodeid]['ready'] = true;
        console.log('[ZWAVE][NODE READY] node%d: %s, %s', nodeid,
                    nodeinfo.manufacturer ? nodeinfo.manufacturer
                    : 'id=' + nodeinfo.manufacturerid,
                    nodeinfo.product ? nodeinfo.product
                    : 'product=' + nodeinfo.productid +
                    ', type=' + nodeinfo.producttype);
        console.log('[ZWAVE][NODE READY] node%d: name="%s", type="%s", location="%s"', nodeid,
                    nodeinfo.name,
                    nodeinfo.type,
                    nodeinfo.loc);
        for (comclass in nodes[nodeid]['classes']) {
            switch (comclass) {
                case 0x25: // COMMAND_CLASS_SWITCH_BINARY
                case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
                    zwave.enablePoll(nodeid, comclass);
                    break;
            }
            var values = nodes[nodeid]['classes'][comclass];
            console.log('[ZWAVE][NODE READY] node%d: class %d', nodeid, comclass);
            for (idx in values)
                console.log('[ZWAVE][NODE READY] node%d:   %s=%s', nodeid, values[idx]['label'], values[idx]['value']);
        }
    });

    zwave.on('notification', function(nodeid, notif) {
        switch (notif) {
            case 0:
                console.log('[ZWAVE][NOTIFICATION] node%d: message complete', nodeid);
                break;
            case 1:
                console.log('[ZWAVE][NOTIFICATION] node%d: timeout', nodeid);
                break;
            case 2:
                console.log('[ZWAVE][NOTIFICATION] node%d: nop', nodeid);
                break;
            case 3:
                console.log('[ZWAVE][NOTIFICATION] node%d: node awake', nodeid);
                break;
            case 4:
                console.log('[ZWAVE][NOTIFICATION] node%d: node sleep', nodeid);
                break;
            case 5:
                console.log('[ZWAVE][NOTIFICATION] node%d: node dead', nodeid);
                break;
            case 6:
                console.log('[ZWAVE][NOTIFICATION] node%d: node alive', nodeid);
                break;
        }
    });


    zwave.on('scan complete', function() {
        console.log('[ZWAVE][SCAN COMPLETE] ====> scan complete, hit ^C to finish.');
        // zwave.setValue(1,37,1,0,true);
        // zwave.refreshNodeInfo(4);
        // console.log(util.inspect(zwave, true, null));
        // set dimmer node 5 to 50%
        //zwave.setValue(5,38,1,0,50);
        //zwave.setValue( {node_id:5, class_id: 38, instance:1, index:0}, 50);
        // Add a new device to the ZWave controller
        // if (zwave.hasOwnProperty('beginControllerCommand')) {
        // using legacy mode (OpenZWave version < 1.3) - no security
        //   zwave.beginControllerCommand('AddDevice', true);
        // } else {
        // using new security API
        // set this to 'true' for secure devices eg. door locks
        // zwave.addNode(false);
    });

    zwave.on('controller command', function(r,s) {
        console.log('[ZWAVE][CONTROLLER COMMAND] controller commmand feedback: r=%d, s=%d',r,s);
    });

    zwave.connect('/dev/ttyACM0');

    process.on('SIGINT', function() {
        console.log('[ZWAVE][SIGINT] disconnecting...');
        zwave.disconnect('/dev/ttyACM0');
        process.exit();
    });
};


exports.getTemperature = function(callback) {
    if (temperature) {
        console.log('Temperature is not defined');
        callback(err);
    }
    else {
        console.log("Temperature: " + temperature);
        callback(err, temperature);
    }
};