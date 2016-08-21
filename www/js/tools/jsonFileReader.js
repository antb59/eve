angular.module('eve.tools').factory('JsonFileReader', ['$http', '$log', '$q', '$timeout', 'configuration', function($http, $log, $q, $timeout, configuration) {
    $log.debug("Building JsonFileReader");

    var service = { 

        readJsonFile : function(pFile) {
            
            var deferred = $q.defer();
            $http.get(pFile)
            .success(function(data) {
                $log.debug("[JsonFileReader] Getting Json File : " + pFile);
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