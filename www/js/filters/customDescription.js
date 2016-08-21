angular.module('eve.filters').filter('customDescription', ['$filter',  function ($filter) {       
    return function (input, limit) {
        if (input.length <= limit) {
            return $filter('limitTo')(input, limit);
        } else {
            return $filter('limitTo')(input, limit) + '(...)';
        };
    };
}]);