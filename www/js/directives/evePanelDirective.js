angular.module('eve.directives').directive('evePanel',['$log', function ($log) {
    return {
        scope: {
            title: '@',
            refreshable: '@',
            collapsable: '@',
            hasTitleLink: '=hasTitleLink',
            collapsed: '=',
            titleLink : '&titleLink',
            refresh: '&'
            
        },
        transclude : true,
        templateUrl: 'templates/directives/evePanel.html',
        link: function(scope, element, attrs) {
            
            $log.debug("[PanelDirective] Link Panel");
            
            scope.collapse = function($event) {
                $log.info("[PanelDirective] Collapse Panel");
                $event.preventDefault()
                scope.collapsed = true;
            };
            
            scope.uncollapse = function($event) {
                $log.info("[PanelDirective] Uncollapse Panel");
                $event.preventDefault()
                scope.collapsed = false;
            };
            
            scope.clickOnTitle = function () {
                $log.info("[PanelDirective] Click on Title");
                scope.titleLink();
            };

            scope.refreshPanel = function($event) {
                $log.info("[PanelDirective] Refresh");
                $event.preventDefault()
                scope.refresh();
            }
        },
    };
}]);