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
            var labels = [];
            var values = [];
            var datas = [];
            for(i = 0; i < $scope.temperatureEvents.length; i++) {
                var iDate = new Date($scope.temperatureEvents[i].datetime);
                var iTemp = parseFloat($scope.temperatureEvents[i].content);
                labels.push(iDate);
                values.push(iTemp);
                datas.push({x: iDate, y: iTemp});
            }
            $scope.tempLabels = labels;
            $scope.tempValues = values;
            $scope.data = [{
                values: datas,
                key: 'Temperature',
                color: '#7777ff',
                area: false      //area - set to true if you want this line to turn into a filled area chart.
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
                bottom: 40,
                left: 55
            },
            x: function(d){ return d.x },
            y: function(d){ return d.y },
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'Date',
                tickFormat: function(d){
                    return d3.time.format("%d-%m %H:%M")(d)
                },
                rotateLabels: -15
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

    //$scope.data = sinAndCos();

    /*Random Data Generator */
    function sinAndCos() {
        var sin = [],sin2 = [],
            cos = [];

        //Data is represented as an array of {x,y} pairs.
        for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: Math.sin(i/10)});
            sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
            cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
        }

        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: sin2,
                key: 'Temperature',
                color: '#7777ff',
                area: true      //area - set to true if you want this line to turn into a filled area chart.
            }
        ];
    };

    /*$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    // Simulate async data update
    $timeout(function () {
        $scope.data = [
            [28, 48, 40, 19, 86, 27, 90],
            [65, 59, 80, 81, 56, 55, 40]
        ];
    }, 3000);*/

    $scope.optionsChart = {
        scales: {
            color: "rgba(255, 255, 255, 1)",
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left',
                    fontColor: "rgba(255, 255, 255, 1)"
                }
            ],
            xAxes: [
                {
                    type: 'time',
                    time: {
                        displayFormats: {
                            quarter: 'MMM YYYY'
                        }
                    }
                }
            ]
        }
    };

})