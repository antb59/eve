angular.module('eve.filters').filter('customNumber', ['$filter', function ($filter) {       
    return function (input, fractionSize) {
        if (input) {
            if (isNaN(input)) {
                return input.replaceAll(".", " ");
            }
            else {
                return $filter('number')(input, fractionSize).replace(/,/g, " ").replace(/\./g, ",");
            };
        }
        else if(input==0){
            return $filter('number')(input, fractionSize).replace(/,/g, " ").replace(/\./g, ",");
        }
        else {
            return input;
        }
    };
}]);