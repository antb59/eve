angular.module('eve.controllers').controller('LoginCtrl', function($rootScope, $scope, $state, AuthenticationService, $log) {

    $log.info('[LoginCtrl]');
    
    $scope.testWebService = function() {
        var testRequest = AuthenticationService.test();
        testRequest.then(function(dataResolved) {
            $scope.testResult = "OK";    
        },function(rejectReason) {
            $scope.testResult = "NOK";
        },function(notifyValue) {
            $log.info("Attempt to test WebService");
        });    
    }; 

    $scope.testWebService();
    
})