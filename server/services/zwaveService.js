var ZWave;
var gcm;
var notificationService;

try {
    ZWave = require('openzwave-shared');
    gcm = require('node-gcm');
    notificationService = require('./notificationService');
    moment = require('moment');
}
catch(e) {
    console.log('Unable to load lib')
    console.log(e)
}

var nodes = [];

exports.init = function(callback) {
    if (!ZWave) return;
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
        console.log('[ZWAVE][%s][VALUE ADDED]node%d: added: %s:%s:%s->%s',new Date(), nodeid, value.index, comclass,
                    value['label'],
                    nodes[nodeid]['classes'][comclass][value.index]['value'],
                    value['value']);
    });

    zwave.on('value changed', function(nodeid, comclass, value) {
        console.log('[ZWAVE][%s][VALUE CHANGED]node%d: changed: %s:%s:%s->%s',new Date(), nodeid, value.index, comclass,
                    value['label'],
                    nodes[nodeid]['classes'][comclass][value.index]['value'],
                    value['value']);
        if ((nodeid == 4) && (comclass == 113) && (value.index == 9) && (nodes[nodeid]['classes'][comclass][value.index]['value'] != value['value'])) {
            var doorState = "closed";
            if (value['value'] == 22)
                doorState = "opened";
            console.log("PUSH DOOR STATUS CHANGED : " + doorState);
            notificationService.notifyAllUsers('Door state changed', moment().format('hh:mm:ss')+' - the door is ' + doorState);
        }
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


exports.getTemperature = function(req, res) {
    console.log("API GET temperature");
    //commandsFlow.pushCommand("GET bookmarksByTag '" + req.params.tag + "'");
    if (!ZWave) {
        console.log('ZWave is not loaded');
        res.status(501).send('ZWave is not loaded');
    }
    else {
        var temperature = nodes[4]['classes']['49']['1'];
        if (!temperature) {
            console.log('Temperature is not defined');
            res.json({
                status: 500,
                message: 'Error while gettting temperature: Temperature is not defined'
            });
        }
        else {
            var tempInCelsus = ((temperature.value - 32)*5/9).toFixed(1);
            res.json({
                status: 200,
                temperature: tempInCelsus
            });
        }
    }
};


exports.getLuminance = function(req, res) {
    console.log("API GET luminance");
    //commandsFlow.pushCommand("GET bookmarksByTag '" + req.params.tag + "'");
    if (!ZWave) {
        console.log('ZWave is not loaded');
        res.status(501).send('ZWave is not loaded');
    }
    else {
        var luminance = nodes[4]['classes']['49']['3'];
        if (!luminance) {
            console.log('Luminance is not defined');
            res.json({
                status: 500,
                message: 'Error while gettting luminance: Luminance is not defined'
            });
        }
        else {
            var lum = ((luminance.value)*1);
            res.json({
                status: 200,
                luminance: lum
            });
        }
    }
};

exports.getDoorStatus = function(req, res) {
    console.log("API GET doorStatus");
    //commandsFlow.pushCommand("GET bookmarksByTag '" + req.params.tag + "'");
    if (!ZWave) {
        console.log('ZWave is not loaded');
        res.status(501).send('ZWave is not loaded');
    }
    else {
        var doorStatus = nodes[4]['classes']['113']['9'];
        if (!doorStatus) {
            console.log('DoorStatus is not defined');
            res.json({
                status: 500,
                message: 'Error while gettting doorStatus: DoorStatus is not defined'
            });
        }
        else {
            var ds = (doorStatus.value == 23) ? "CLOSED" : "OPENED";
            res.json({
                status: 200,
                doorStatus: ds
            });
        }
    }
};


