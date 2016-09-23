var buildEventsServiceMock = function($rootScope, $q) {
    //http://www.kdmooreconsulting.com/blogs/authentication-with-ionic-and-angular-js-in-a-cordovaphonegap-mobile-web-application/
    //http://www.frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/

    var defaultTempEvents = [{"content":"20","module":"TEMPERATURE","datetime":"2016-09-22T22:50:48.043Z","_id":"57e460485bae74e21cd919a5","__v":0},
                             {"content":"20.2","module":"TEMPERATURE","datetime":"2016-09-23T05:40:55.496Z","_id":"57e4c0675bae74e21cd919ae","__v":0},
                             {"content":"20.4","module":"TEMPERATURE","datetime":"2016-09-23T05:41:06.329Z","_id":"57e4c0725bae74e21cd919af","__v":0},
                             {"content":"20.6","module":"TEMPERATURE","datetime":"2016-09-23T05:41:24.995Z","_id":"57e4c0845bae74e21cd919b1","__v":0},
                             {"content":"20.4","module":"TEMPERATURE","datetime":"2016-09-23T05:57:40.410Z","_id":"57e4c4548007f5522264f377","__v":0},
                             {"content":"20.3","module":"TEMPERATURE","datetime":"2016-09-23T05:57:45.113Z","_id":"57e4c4598007f5522264f37a","__v":0}];
    var defaultLumEvents = [{"content":"20","module":"TEMPERATURE","datetime":"2016-09-22T22:50:48.043Z","_id":"57e460485bae74e21cd919a5","__v":0},
                             {"content":"20.2","module":"TEMPERATURE","datetime":"2016-09-23T05:40:55.496Z","_id":"57e4c0675bae74e21cd919ae","__v":0},
                             {"content":"20.4","module":"TEMPERATURE","datetime":"2016-09-23T05:41:06.329Z","_id":"57e4c0725bae74e21cd919af","__v":0},
                             {"content":"20.6","module":"TEMPERATURE","datetime":"2016-09-23T05:41:24.995Z","_id":"57e4c0845bae74e21cd919b1","__v":0},
                             {"content":"20.4","module":"TEMPERATURE","datetime":"2016-09-23T05:57:40.410Z","_id":"57e4c4548007f5522264f377","__v":0},
                             {"content":"20.3","module":"TEMPERATURE","datetime":"2016-09-23T05:57:45.113Z","_id":"57e4c4598007f5522264f37a","__v":0}];
    var defaultDoorStatus = {"doorStatus" : "UNDEFINED"};

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
        },

        getDoorStatus : function() {
            console.log("[HomeControlServiceMock] getDoorStatus");
            var deferred = $q.defer();
            setTimeout(function() {
                deferred.resolve(defaultDoorStatus);
            }, 0);
            return deferred.promise;
        }

    };
    return service;
};