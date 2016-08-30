angular.module('eve.services').factory('HomeControlService', ['$rootScope', '$http', '$log', '$q', 'RequestSender', 'configuration', 'AuthenticationService', function($rootScope, $http, $log, $q, RequestSender, configuration, AuthenticationService) {
    $log.debug("Building HomeControlService");
    var service = {

        getTemperature: function() {
            $log.info("HomeControlService getTemperature");
            return RequestSender.sendRequest("GET","getTemperature",'',  {});
        }
    };

    if (configuration.applicationMode != "MOCKUP") {
        return service;
    }
    else {
        return buildHomeControlServiceMock($rootScope, $q);
    }

}]);