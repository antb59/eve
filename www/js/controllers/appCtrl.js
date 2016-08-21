angular.module('eve.controllers').controller('AppCtrl', function($rootScope, $scope, $state, $log, screenSize, AuthenticationService) {

    $log.info("[AppCtrl] starting");  

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

    $scope.$on('event:auth-logout-complete', function() {
        $state.go('app.home', {}, {reload: true, inherit: false});
    });

    $scope.logout = function() {
        AuthenticationService.logout();       
    }

    $scope.isLoggedIn = function() {
        return AuthenticationService.isLoggedIn();       
    }

    $scope.goToLogin = function() {
        $log.info("[AppCtrl] goToLogin");  
        $state.go('app.login', {}, {reload: true, inherit: false});      
    }

    $scope.goToHome = function() {
        $log.info("[AppCtrl] goToHome");  
        $state.go('app.home', {}, {reload: true, inherit: false});      
    }

    $rootScope.$on('event:auth-loginConfirmed', function() {
        $log.info('[AppCtrl] event:auth-loginConfirmed - pageRequested : ' + $rootScope.pageRequested);
        $state.go($rootScope.pageRequested || 'app.home', {}, {reload: true, inherit: false});
    });

})