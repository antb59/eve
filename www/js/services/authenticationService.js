angular.module('eve.services', ['http-auth-interceptor']).factory('AuthenticationService', ['$rootScope', '$http', 'authService', '$log', '$q', 'RequestSender', 'configuration', 'md5', function($rootScope, $http, authService, $log, $q, RequestSender, configuration, md5) {
    $log.debug("Building AuthenticationService");
    var service = {

        isLoggedIn : function() {
            return $rootScope.user;
        },

        login: function(user, pageRequested) {
            $log.info("AuthenticationService login")
            return RequestSender.sendRequest("POST","login",'',  {login: user.username, password: md5.createHash(user.password)});

        },

        logout: function(login) {
            $rootScope.$broadcast('event:auth-logout-complete');
            return RequestSender.sendRequest("POST","logout",'',  {login: login});

        },
        
        loginCancelled: function() {
            authService.loginCancelled();
        }
    };

    if (configuration.applicationMode != "MOCKUP") {
        return service;
    }
    else {
        return buildAuthenticationServiceMock($rootScope, $q);
    }

}])