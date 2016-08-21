angular.module('eve.directives').directive('themeSelector', ['$log', '$rootScope', function ($log,$rootScope) {
    return {
        scope: {},
        link: function(scope,element,attrs) {
            scope.availableThemes = $rootScope.availableThemes;
            
            scope.selectedTheme = $rootScope.selectedTheme;
            
            scope.changeTheme = $rootScope.changeTheme;
        },
        templateUrl: 'templates/directives/themeSelector.html'
    };
}]);