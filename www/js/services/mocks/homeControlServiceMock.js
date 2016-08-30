var buildHomeControlServiceMock = function($rootScope, $q) {
    //http://www.kdmooreconsulting.com/blogs/authentication-with-ionic-and-angular-js-in-a-cordovaphonegap-mobile-web-application/
    //http://www.frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/

    var defaultTemp = {"temperature" : 0.0};
    var defaultTemp = {"luminance" : 0};
    
    var service = {
        
        getTemperature : function() {
            console.log("[HomeControlServiceMock] getTemperature");
            var deferred = $q.defer();
            setTimeout(function() {
                deferred.resolve(defaultTemp);
            }, 0);
            return deferred.promise;
        },
        
        getLuminance : function() {
            console.log("[HomeControlServiceMock] getLuminance");
            var deferred = $q.defer();
            setTimeout(function() {
                deferred.resolve(defaultLum);
            }, 0);
            return deferred.promise;
        }
        
    };
    return service;
};