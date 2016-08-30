angular.module('eve.controllers').controller('homeCtrl', function($scope, $state, $stateParams, $window, $log, $rootScope, configuration, HomeControlService) {

    $log.info('[HomeCtrl] starting');

    var getTemperatureRequest = HomeControlService.getTemperature();
    getTemperatureRequest.then(function(dataResolved) {
        $scope.temperature = dataResolved.temperature;    
    },function(rejectReason) {
        $log.error("Unable to get temperature : " + rejectReason);
        $scope.temperature = "Unable to get temperature : " + rejectReason;
    },function(notifyValue) {
        $log.info("Attempt to get temperature");
    });


})