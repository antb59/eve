angular.module('eve.services', ['http-auth-interceptor']).factory('AuthenticationService', ['$rootScope', '$http', '$log', '$q', 'RequestSender', 'configuration', '$window', function($rootScope, $http, $log, $q, RequestSender, configuration, $window) {
    $log.debug("Building AuthenticationService");
    var service = {

        saveToken : function (token) {
            $window.localStorage['eve-token'] = token;
        },

        getToken : function () {
            return $window.localStorage['eve-token'];
        },

        isLoggedIn : function() {
            var token = this.getToken();
            var payload;

            if(token){
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        },

        currentUser : function() {
            if(this.isLoggedIn()){
                var token = this.getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    username : payload.username
                };
            }
        },

        /*register : function(user) {
            return $http.post('/api/register', user).success(function(data){
                saveToken(data.token);
            });
        },*/

        login : function(user) {
            $log.info("AuthenticationService login")
            return RequestSender.sendRequest("POST","login",'', user);
        },

        logout : function() {
            $window.localStorage.removeItem('eve-token');
        }

        /*login: function(user, pageRequested) {
            $log.info("AuthenticationService login")
            return RequestSender.sendRequest("POST","login",'',  {login: user.username, password: md5.createHash(user.password)});

        },

        logout: function(login) {
            $rootScope.$broadcast('event:auth-logout-complete');
            return RequestSender.sendRequest("POST","logout",'',  {login: login});

        },*/

    };

    if (configuration.applicationMode != "MOCKUP") {
        return service;
    }
    else {
        return buildAuthenticationServiceMock($rootScope, $q);
    }

}]);