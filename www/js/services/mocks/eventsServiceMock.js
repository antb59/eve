var buildEventsServiceMock = function($rootScope, $q) {
    //http://www.kdmooreconsulting.com/blogs/authentication-with-ionic-and-angular-js-in-a-cordovaphonegap-mobile-web-application/
    //http://www.frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/

    var defaultTempEvents = [{"content":"20","datetime":"2016-09-22T22:50:48.043Z"},
                             {"content":"20.2","datetime":"2016-09-23T05:40:55.496Z"},
                             {"content":"20.4","datetime":"2016-09-23T05:41:06.329Z"},
                             {"content":"20.6","datetime":"2016-09-23T05:41:24.995Z"},
                             {"content":"20.4","datetime":"2016-09-23T05:57:40.410Z"},
                             {"content":"20.3","datetime":"2016-09-23T05:57:45.113Z"}];


    var service = {

        getEvents : function(module) {
            console.log("[EventsServiceMock] getEvents");
            var deferred = $q.defer();
            setTimeout(function() {
                deferred.resolve(defaultTempEvents);
            }, 0);
            return deferred.promise;
        }

    };
    return service;
};