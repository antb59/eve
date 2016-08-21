angular.module('eve.tools').factory('RequestSender', ['$rootScope', '$http', '$state', '$log', '$q', '$timeout', 'configuration', function($rootScope, $http, $state, $log, $q, $timeout, configuration) {
    $log.debug("Building RequestSender");

    var service = { 

        sendRequest : function(pMethod,pURL,pParams,pData) {
            var config = {
                method: pMethod,
                url: configuration.webServiceURL + pURL,
                params: pParams,
                data: pData,
                withCredentials : false

            };
            var deferred = $q.defer();
            $timeout(function() {
                $log.debug("[RequestSender] Requesting on : " + pURL);
                deferred.notify('Requesting')}
                     , 0);
            $http(config)
            .success(function(data, status, headers, config) {
                $log.debug("[RequestSender] Resolving on : " + pURL);
                deferred.resolve(data);
            })
            .error(function(data,status) {
                $log.error(data, status);
                deferred.reject("Request failed");
            });
            return deferred.promise;
        }

    };

    return service;

}])