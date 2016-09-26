var buildEventsServiceMock = function($rootScope, $q) {
    //http://www.kdmooreconsulting.com/blogs/authentication-with-ionic-and-angular-js-in-a-cordovaphonegap-mobile-web-application/
    //http://www.frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/

    var defaultTempEvents = [{"content":"20","module":"TEMPERATURE"},
                             {"content":"20.2","module":"TEMPERATURE"},
                             {"content":"20.4","module":"TEMPERATURE"},
                             {"content":"20.6","module":"TEMPERATURE"},
                             {"content":"20.4","module":"TEMPERATURE"},
                             {"content":"20.3","module":"TEMPERATURE"}];

    var service = {

        getEvents : function() {
            console.log("[EventsServiceMock] getEvents");
            var deferred = $q.defer();
            setTimeout(function() {
                deferred.resolve(defaultTemp);
            }, 0);
            return deferred.promise;
        }

    };
    return service;
};