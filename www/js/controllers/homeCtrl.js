angular.module('eve.controllers').controller('homeCtrl', function($scope, $state, $stateParams, $window, $log, $rootScope, configuration, HomeControlService) {

    $log.info('[HomeCtrl] starting');

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


})