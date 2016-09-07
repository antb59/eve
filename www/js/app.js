var app = angular.module('eve',['ui.router', 'ngSanitize', 'angularMoment', 'angular-md5', 'matchMedia', 'ui.bootstrap', 'eve.config', 'eve.services', 'eve.controllers', 'eve.directives', 'eve.filters', 'eve.tools'])

.run(function($httpBackend, $log, $http, $rootScope, $state, configuration, AuthenticationService, JsonFileReader) {
    $log.debug("Running eve");

    $rootScope.applicationMenus = configuration.menus;
    //$log.error("[App] Menus : " + JSON.stringify($rootScope.applicationMenus));

    var dictionnaryRequest = JsonFileReader.readJsonFile("i18n/lang_" + configuration.lang + ".json");
    dictionnaryRequest.then(function(dataResolved) {  
        $rootScope.dictionnary = dataResolved;
        configuration.dictionnary = dataResolved;
    },function(rejectReason) {
        $log.error("[App] Unable to retrieve dictionnary: " + rejectReason);
        $rootScope.dictionnary = [];
    },function(notifyValue) {
        $log.info("[App] Retrieving dictionnary");
    });

    $rootScope.availableThemes = [
        { id: 0, label : "Classic", file : "css/main_classic_theme.css", graphProfile : "profiles/intraday2.xml" },
        { id: 1, label : "Transparent", file : "css/main_transparent_theme.css", graphProfile : "profiles/intraday.xml" },
        { id: 2, label : "Transparent_2", file : "css/main_transparent2_theme.css", graphProfile : "profiles/intraday.xml" },
        { id: 3, label : "Boursorama", file : "css/main_boursorama_theme.css", graphProfile : "profiles/intraday2.xml" }
    ];

    $rootScope.selectedThemeId = window.localStorage.getItem("theme") || 1;    

    $rootScope.changeTheme = function (id) {
        $log.info("[App] Change Theme [" + id + "]");
        $rootScope.selectedTheme = $rootScope.availableThemes[id];

        window.localStorage.setItem("theme", id);

        //$document.getElementById('mainStylesheet').href = $rootScope.selectedTheme.file;
        $log.info("Element : " + jQuery('#mainStylesheet'));
        jQuery('#mainStylesheet').attr("href",$rootScope.selectedTheme.file);
        $rootScope.$apply;
    };

    $rootScope.changeTheme($rootScope.selectedThemeId);

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        $log.info("[App] Event stateChangeStart : " + fromState.url + " -> " + toState.url);
        if (toState.authenticate && !AuthenticationService.isLoggedIn()){
            $log.info("[App] Access not allowed to " + toState.url + " from " + fromState.url);
            // User isn’t authenticated
            $log.info("[App] pageRequested is set to " + toState.name);
            $rootScope.pageRequested = toState.name;
            event.preventDefault();
            $state.transitionTo("app.login");
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;

    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/app/login');
                }
                return $q.reject(response);
            }
        };
    });

    $stateProvider
    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/pages/mainTemplate.html",
        controller: 'AppCtrl'
    })

    .state('app.login', {
        url: "/login",
        views: {
            'pageContent':{
                templateUrl: "templates/pages/login.html",
                controller: 'LoginCtrl'
            }
        }
    })

    .state('app.home', {
        url: "/home",
        views: {
            'pageContent' :{
                templateUrl: "templates/pages/home.html",
                controller: 'homeCtrl'
            }
        },
        authenticate: true 
    })



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});