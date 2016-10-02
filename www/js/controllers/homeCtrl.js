angular.module('eve.controllers').controller('homeCtrl', function($scope, $state, $stateParams, $window, $log, $rootScope, $timeout, configuration, HomeControlService, EventsService) {

    $log.info('[HomeCtrl] starting');

    $scope.data = [{
        values: [],
        key: 'Temperature',
        color: '#7777ff',
        area: true      //area - set to true if you want this line to turn into a filled area chart.
    }];


    $scope.refreshTemperature = function() {
        var getTemperatureRequest = HomeControlService.getTemperature();
        getTemperatureRequest.then(function(dataResolved) {
            $scope.temperature = dataResolved.temperature;    
        },function(rejectReason) {
            $log.error("Unable to get temperature : " + rejectReason);
            $scope.errorMsg = "Unable to get temperature : " + rejectReason;
            $scope.temperature = 0;
        },function(notifyValue) {
            $log.info("Attempt to get temperature");
        });    
    }; 

    $scope.getTemperatureEvents = function() {
        var getTemperatureEventsRequest = EventsService.getEvents('TEMPERATURE');
        getTemperatureEventsRequest.then(function(dataResolved) {
            console.log("getTemperatureEvents = " + JSON.stringify(dataResolved)); 
            $scope.temperatureEvents = dataResolved.events;
            var datas = [];
            for(i = 0; i < $scope.temperatureEvents.length; i++) {
                var iDate = new Date($scope.temperatureEvents[i].datetime);
                var iTemp = parseFloat($scope.temperatureEvents[i].content);
                datas.push({x: iDate, y: iTemp});
            }
            $scope.data = [{
                values: datas,
                key: 'Temperature',
                color: '#7777ff',
                area: true      //area - set to true if you want this line to turn into a filled area chart.
            }];


        },function(rejectReason) {
            $log.error("Unable to get temperature events : " + rejectReason);
            $scope.errorMsg = "Unable to get temperature events : " + rejectReason;
            $scope.temperatureEvents = [];
        },function(notifyValue) {
            $log.info("Attempt to get temperature events");
        });    
    }; 



    $scope.refreshLuminance = function() {
        var getLuminanceRequest = HomeControlService.getLuminance();
        getLuminanceRequest.then(function(dataResolved) {
            $scope.luminance = dataResolved.luminance;    
        },function(rejectReason) {
            $log.error("Unable to get luminance : " + rejectReason);
            $scope.errorMsg = "Unable to get luminance : " + rejectReason;
            $scope.luminance = 0;
        },function(notifyValue) {
            $log.info("Attempt to get luminance");
        });
    }

    $scope.refreshDoorStatus = function() {
        var getDoorStatusRequest = HomeControlService.getDoorStatus();
        getDoorStatusRequest.then(function(dataResolved) {
            $scope.doorStatus = dataResolved.doorStatus;    
        },function(rejectReason) {
            $log.error("Unable to get doorStatus : " + rejectReason);
            $scope.errorMsg = "Unable to get doorStatus : " + rejectReason;
            $scope.doorStatus = "UNDEFINED";
        },function(notifyValue) {
            $log.info("Attempt to get doorStatus");
        });    
    }

    $scope.refreshTemperature();
    $scope.refreshLuminance();
    $scope.refreshDoorStatus();
    $scope.getTemperatureEvents();

    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 100,
                left: 70
            },
            useInteractiveGuideline: true,
            x: function(d){ return d.x },
            y: function(d){ return d.y },
            interpolate: 'basis',
            showLegend: false,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
                tickFormat: function(d){
                    return d3.time.format("%d-%m %H:%M")(d)
                },
                rotateLabels: -45
            },
            xScale : d3.time.scale(),
            yAxis: {
                axisLabel: 'Temperature (°C)',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: -10
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            }
        }
    };


})