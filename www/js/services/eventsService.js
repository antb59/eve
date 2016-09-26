angular.module('eve.services').factory('EventsService', ['$rootScope', '$http', '$log', '$q', 'RequestSender', 'configuration', 'AuthenticationService', function($rootScope, $http, $log, $q, RequestSender, configuration, AuthenticationService) {
    $log.debug("Building EventsService");
    var service = {

        getEvents: function(module) {
            $log.info("EventsService getEvents");
            return RequestSender.sendRequest("GET","getEvents",'',  {});
        }
    };

    if (configuration.applicationMode != "MOCKUP") {
        return service;
    }
    else {
        return buildEventsServiceMock($rootScope, $q);
    }

}]);