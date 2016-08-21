angular.module('eve.tools').factory('Translator', ['$rootScope', '$http', '$log', '$q', '$timeout', 'configuration', function($rootScope, $http, $log, $q, $timeout, configuration) {
    $log.debug("Building Translator");

    var service = {

        translate : function(key) {
            //$log.debug("[Translator] Translate [" + key + "] => "+ configuration.dictionnary[key]);    
            if(configuration.dictionnary[key])
                return configuration.dictionnary[key];
            return key;
        }
    };

    return service;

}]);