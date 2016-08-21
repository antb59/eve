var buildAuthenticationServiceMock = function($rootScope, $q) {
    //http://www.kdmooreconsulting.com/blogs/authentication-with-ionic-and-angular-js-in-a-cordovaphonegap-mobile-web-application/
    //http://www.frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/

    var service = {

        isLoggedIn : function() {
            /*$log.debug("[AuthenticationService] isLoggedIn");*/
            return $rootScope.user;
        },    


        login : function(user, pageRequested) {
            console.log("[AuthenticationServiceMock] login : user = " + user.username + " password = " + user.password);
            var deferred = $q.defer();
            setTimeout(function() {
                if ((user.username === "antoine") && (user.password === "antoine")) {
                    console.log("[AuthenticationServiceMock] login resolve");
                    deferred.resolve();
                    /*$rootScope.user = user;
                    $rootScope.$broadcast('event:auth-loginConfirmed', user, pageRequested);*/
                }
                else {
                    deferred.reject("Wrong login/password");
                    //$rootScope.$broadcast('event:auth-login-failed', "wrong password");
                }
            }, 0);
            return deferred.promise;
        },


        logout: function(user) {
            $rootScope.user = undefined;
            $rootScope.$broadcast('event:auth-logout-complete');
        },	
        loginCancelled: function() {
            //authService.loginCancelled();
        }
    };
    return service;
};