angular.module('eve.services', ['http-auth-interceptor']).factory('HomeControlService', ['$rootScope', '$http', '$log', '$q', 'RequestSender', 'configuration', 'md5', function($rootScope, $http, $log, $q, RequestSender, configuration, md5) {
    $log.debug("Building HomeControlService");
    var service = {

        getTemperature: function() {
            $log.info("HomeControlService getTemperature")
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