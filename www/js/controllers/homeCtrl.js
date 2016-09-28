angular.module('eve.controllers').controller('homeCtrl', function($scope, $state, $stateParams, $window, $log, $rootScope, $timeout, configuration, HomeControlService, EventsService) {

    $log.info('[HomeCtrl] starting');


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
            for(i = 0; i < $scope.temperatureEvents.length; i++) {
                console.log("Content = " + $scope.temperatureEvents[i].content);
                labels.push($scope.temperatureEvents[i].datetime);
                values.push($scope.temperatureEvents[i].content);
            }
            $scope.tempLabels = labels;
            $scope.tempValues = values;


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

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    // Simulate async data update
    /*$timeout(function () {
        $scope.data = [
            [28, 48, 40, 19, 86, 27, 90],
            [65, 59, 80, 81, 56, 55, 40]
        ];
    }, 3000);*/

    $scope.options = {
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