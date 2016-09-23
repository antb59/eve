angular.module('eve.controllers').controller('LoginCtrl', function($rootScope, $scope, $state, screenSize, AuthenticationService, $log) {

    $log.info('[LoginCtrl]');
    
    // Using dynamic method `on`, which will set the variables initially and then update the variable on window resize
    $scope.desktopDisplay = screenSize.on('md, lg', function(match){
        $scope.desktopDisplay = match;
    });

    $scope.tabletDisplay = screenSize.on('sm', function(match){
        $scope.tabletDisplay = match;
    });

    $scope.mobileDisplay = screenSize.on('xs', function(match){
        $scope.mobileDisplay = match;
    });

    
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
    
    $rootScope.$on('event:auth-loginConfirmed', function() {
        $log.info('[LoginCtrl] event:auth-loginConfirmed - pageRequested : ' + $rootScope.pageRequested);
        $state.go($rootScope.pageRequested || 'app.home', {}, {reload: true, inherit: false});
    });

    $scope.testWebService();
    
})