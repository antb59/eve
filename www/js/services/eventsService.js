angular.module('eve.services').factory('EventsService', ['$rootScope', '$http', '$log', '$q', 'RequestSender', 'configuration', 'AuthenticationService', function($rootScope, $http, $log, $q, RequestSender, configuration, AuthenticationService) {
    $log.debug("Building EventsService");
    var service = {

        getEvents: function(module) {
            $log.info("EventsService getEvents");
            var params = JSON.parse('{ "module": "' + module + '"}');
            console.log("params = " + params);
            return RequestSender.sendRequest("GET","getEvents",params,  {});
        }
    };

    if (configuration.applicationMode != "MOCKUP") {
        return service;
    }
    else {
        return buildEventsServiceMock($rootScope, $q);
    }

}]);