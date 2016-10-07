var ZWave;
var translationService = require('./translationService'),
    notificationService = require('./notificationService'),
    eventsService = require('./eventsService'),
    moment = require('moment'),
    winston = require('winston');

winston.loggers.add('homeControl', {
    file: {
        filename: 'logs/homeControl.log'
    }
});
//winston.loggers.get('homeControl').remove(winston.transports.Console);
var homeControlLog = winston.loggers.get('homeControl');



try {
    ZWave = require('openzwave-shared');

}
catch(e) {
    homeControlLog.error('Unable to load lib openzwave-shared' + e);
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
        homeControlLog.debug('[ZWAVE][DRIVER READY]scanning homeid=0x%s...', homeid.toString(16));
    });

    zwave.on('driver failed', function() {
        homeControlLog.error('[ZWAVE][DRIVER FAILED]failed to start driver');
        zwave.disconnect();
        process.exit();
    });

    zwave.on('node added', function(nodeid) {
        homeControlLog.info('[ZWAVE][NODE ADDED]node%d', nodeid);
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
        homeControlLog.info('[ZWAVE][%s][VALUE ADDED]node%d: added: %s:%s:%s->%s',new Date(), nodeid, value.index, comclass,
                            value['label'],
                            nodes[nodeid]['classes'][comclass][value.index]['value'],
                            value['value']);

        // TEMPERATURE INIT
        // COMCLASS = 49
        // VALUE INDEX = 1
        if ((nodeid == 4) && (comclass == 49) && (value.index == 1)) {
            var tempInCelsus = ((value['value'] - 32)*5/9).toFixed(1);
            eventsService.store('TEMPERATURE', tempInCelsus);
        }

        // LUMINANCE INIT
        // COMCLASS = 49
        // VALUE INDEX = 3
        if ((nodeid == 4) && (comclass == 49) && (value.index == 3)) {
            var lum = ((value['value'])*1);
            eventsService.store('LUMINANCE', lum);
        }

    });

    zwave.on('value changed', function(nodeid, comclass, value) {
        homeControlLog.debug('[ZWAVE][%s][VALUE CHANGED]node%d: changed: %s:%s:%s->%s',new Date(), nodeid, value.index, comclass,
                             value['label'],
                             nodes[nodeid]['classes'][comclass][value.index]['value'],
                             value['value']);

        // DOOR STATUS CHANGED
        // COMCLASS = 13
        // VALUE INDEX = 9
        if ((nodeid == 4) && (comclass == 113) && (value.index == 9) && (nodes[nodeid]['classes'][comclass][value.index]['value'] != value['value'])) {
            var doorState = "closed";
            if (value['value'] == 22)
                doorState = "opened";
            homeControlLog.debug("PUSH DOOR STATUS CHANGED : " + doorState);
            eventsService.store('DOOR','FRONT DOOR ' + doorState.toUpperCase());
            var notifMsg = moment().format('HH:mm:ss') + ' - ' + translationService.translate('FRONT_DOOR_IS_' + doorState.toUpperCase());
            notificationService.notifyAllUsers(translationService.translate('FRONT_DOOR'), notifMsg, function(err,response){});
        }

        // TEMPERATURE CHANGED
        // COMCLASS = 49
        // VALUE INDEX = 1
        if ((nodeid == 4) && (comclass == 49) && (value.index == 1) && (nodes[nodeid]['classes'][comclass][value.index]['value'] != value['value'])) {
            var tempInCelsus = ((value['value'] - 32)*5/9).toFixed(1);
            eventsService.store('TEMPERATURE', tempInCelsus);
        }

        // LUMINANCE CHANGED
        // COMCLASS = 49
        // VALUE INDEX = 3
        if ((nodeid == 4) && (comclass == 49) && (value.index == 3) && (nodes[nodeid]['classes'][comclass][value.index]['value'] != value['value'])) {
            var lum = ((value['value'])*1);
            eventsService.store('LUMINANCE', lum);
        }

        nodes[nodeid]['classes'][comclass][value.index] = value;

    });

    zwave.on('value removed', function(nodeid, comclass, index) {
        if (nodes[nodeid]['classes'][comclass] &&
            nodes[nodeid]['classes'][comclass][index])
            delete nodes[nodeid]['classes'][comclass][index];
    });

    zwave.on('node naming', function(nodeid, nodeinfo) {
        homeControlLog.info('[ZWAVE][%s][NODE NAMING]node%d',new Date(), nodeid);
        homeControlLog.info('[ZWAVE][NODE READY] node%d: %s, %s', nodeid,
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
        homeControlLog.info('[ZWAVE][NODE READY] node%d: %s, %s', nodeid,
                            nodeinfo.manufacturer ? nodeinfo.manufacturer
                            : 'id=' + nodeinfo.manufacturerid,
                            nodeinfo.product ? nodeinfo.product
                            : 'product=' + nodeinfo.productid +
                            ', type=' + nodeinfo.producttype);
        homeControlLog.info('[ZWAVE][NODE READY] node%d: name="%s", type="%s", location="%s"', nodeid,
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
            homeControlLog.info('[ZWAVE][NODE READY] node%d: class %d', nodeid, comclass);
            for (idx in values)
                homeControlLog.info('[ZWAVE][NODE READY] node%d:   %s=%s', nodeid, values[idx]['label'], values[idx]['value']);
        }
    });

    zwave.on('notification', function(nodeid, notif) {
        switch (notif) {
            case 0:
                homeControlLog.debug('[ZWAVE][NOTIFICATION] node%d: message complete', nodeid);
                break;
            case 1:
                homeControlLog.debug('[ZWAVE][NOTIFICATION] node%d: timeout', nodeid);
                break;
            case 2:
                homeControlLog.debug('[ZWAVE][NOTIFICATION] node%d: nop', nodeid);
                break;
            case 3:
                homeControlLog.debug('[ZWAVE][NOTIFICATION] node%d: node awake', nodeid);
                break;
            case 4:
                homeControlLog.debug('[ZWAVE][NOTIFICATION] node%d: node sleep', nodeid);
                break;
            case 5:
                homeControlLog.debug('[ZWAVE][NOTIFICATION] node%d: node dead', nodeid);
                break;
            case 6:
                homeControlLog.debug('[ZWAVE][NOTIFICATION] node%d: node alive', nodeid);
                break;
        }
    });


    zwave.on('scan complete', function() {
        homeControlLog.info('[ZWAVE][SCAN COMPLETE] ====> scan complete, hit ^C to finish.');
        var time = "" + moment().format('hh:mm:ss');
        eventsService.store('EVE','HOMECONTROL READY');
        var notifMsg = moment().format('HH:mm:ss') + ' - ' + translationService.translate('HOME_CONTROL_READY');
        //notificationService.notifyAllUsers(translationService.translate('HOME_CONTROL_READY'), notifMsg, function(err,response){});
        // zwave.setValue(1,37,1,0,true);
        // zwave.refreshNodeInfo(4);
        // console.log(util.inspect(zwave, true, null));
        // set dimmer node 5 to 50%
        //zwave.setValue(5,38,1,0,50);
        //zwave.setValue( {node_id:5, class_id: 38, instance:1, index:0}, 50);
        // Add a new device to the ZWave controller
        if (zwave.hasOwnProperty('beginControllerCommand')) {
            using legacy mode (OpenZWave version < 1.3) - no security
            zwave.beginControllerCommand('AddDevice', true);
        } else {
            // using new security API
            // set this to 'true' for secure devices eg. door locks
            zwave.addNode(false);
        }
    });

    zwave.on('controller command', function(r,s) {
        homeControlLog.debug('[ZWAVE][CONTROLLER COMMAND] controller commmand feedback: r=%d, s=%d',r,s);
    });

    zwave.connect('/dev/ttyACM0');

    process.on('SIGINT', function() {
        homeControlLog.debug('[ZWAVE][SIGINT] disconnecting...');
        zwave.disconnect('/dev/ttyACM0');
        process.exit();
    });
};


exports.getTemperature = function(req, res) {
    homeControlLog.info("API GET temperature");
    //commandsFlow.pushCommand("GET bookmarksByTag '" + req.params.tag + "'");
    if (!ZWave) {
        homeControlLog.debug('ZWave is not loaded');
        res.status(501).send('ZWave is not loaded');
    }
    else {
        var temperature = nodes[4]['classes']['49']['1'];
        if (!temperature) {
            homeControlLog.debug('Temperature is not defined');
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
    homeControlLog.info("API GET luminance");
    //commandsFlow.pushCommand("GET bookmarksByTag '" + req.params.tag + "'");
    if (!ZWave) {
        homeControlLog.debug('ZWave is not loaded');
        res.status(501).send('ZWave is not loaded');
    }
    else {
        var luminance = nodes[4]['classes']['49']['3'];
        if (!luminance) {
            homeControlLog.debug('Luminance is not defined');
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
    homeControlLog.info("API GET doorStatus");
    //commandsFlow.pushCommand("GET bookmarksByTag '" + req.params.tag + "'");
    if (!ZWave) {
        homeControlLog.debug('ZWave is not loaded');
        res.status(501).send('ZWave is not loaded');
    }
    else {
        var doorStatus = nodes[4]['classes']['113']['9'];
        if (!doorStatus) {
            homeControlLog.debug('DoorStatus is not defined');
            res.json({
                status: 500,
                message: 'Error while gettting doorStatus: DoorStatus is not defined'
            });
        }
        else {
            var ds = (doorStatus.value == 22) ? "OPENED" : "CLOSED";
            res.json({
                status: 200,
                doorStatus: ds
            });
        }
    }
};


