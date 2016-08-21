angular.module('eve.filters').filter('translate', ['$filter', '$log', 'Translator' , function ($filter, $log, Translator) {     
    return function (input) {  
        var translatedInput = Translator.translate(input);
        return translatedInput;
    };
}]);