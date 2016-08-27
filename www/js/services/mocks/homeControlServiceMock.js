var buildHomeControlServiceMock = function($rootScope, $q) {
    //http://www.kdmooreconsulting.com/blogs/authentication-with-ionic-and-angular-js-in-a-cordovaphonegap-mobile-web-application/
    //http://www.frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/

    var service = {

        isLoggedIn : function() {
            /*$log.debug("[AuthenticationService] isLoggedIn");*/
            return $rootScope.user;
        },    


        getTemperature : function() {
            console.log("[HomeControlServiceMock] getTemperature");
            var deferred = $q.defer();
            setTimeout(function() {
                deferred.resolve('{"temperature" : "0.0"}');
            }, 0);
            return deferred.promise;
        }
    };
    return service;
};