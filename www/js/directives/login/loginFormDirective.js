angular.module('eve.directives').directive('loginForm', ['$log', '$q', '$rootScope','AuthenticationService', function ($log,$q,$rootScope,AuthenticationService) {
    return {
        scope: {},
        link: function(scope,el, attrs) {
            scope.message = "";

            scope.user = {
                username: null,
                password: null
            };

            scope.rememberMeSelected = false;

            scope.rememberMeSelect = function() {
                $log.info("[LoginFormDirective] Remember Me select");
                scope.rememberMeSelected = true;
            };

            scope.rememberMeUnselect = function() {
                $log.info("[LoginFormDirective] Remember Me unselect");
                scope.rememberMeSelected = false;
            }

            scope.login = function() {
                $log.info("[LoginFormDirective] login - pageRequested : " + $rootScope.pageRequested);
                var loginRequest = AuthenticationService.login(scope.user, $rootScope.pageRequested);
                loginRequest.then(function(dataResolved) {
                    $rootScope.user = scope.user;
                    $rootScope.$broadcast('event:auth-loginConfirmed', scope.user, $rootScope.pageRequested);
                },function(rejectReason) {
                    $log.error("Impossible de se connecter : " + rejectReason);
                    $rootScope.$broadcast('event:auth-login-failed', "wrong password");
                    $rootScope.user = {
                        username: null,
                        password: null
                    };
                },function(notifyValue) {
                    $log.info("Connexion de l'utilisateur");
                });
            };


            $rootScope.$on('event:auth-loginConfirmed', function() {
                $log.info("[LoginFormDirective] event:auth-loginConfirmed - pageRequested : " + $rootScope.pageRequested);
                scope.username = undefined;
                scope.password = undefined;
            });

            $rootScope.$on('event:auth-login-failed', function(e, status) {
                var error = "Login failed.";
                if (status == 401) {
                    error = "Invalid Username or Password.";
                }
                scope.message = error;
            });

            scope.idSaveChange = function() {
                console.log('idSave Change', scope.idSave.checked);
            };
            scope.idSave = { checked: true };    
        },
        templateUrl: 'templates/directives/login/loginForm.html'
    };
}]);