'use strict';
/*
// Declare app level module which depends on filters, and services
var app = angular.module('eveApp', ['ngRoute']);
*/

var app = angular.module('pirateBoxApp', ['ngRoute'])
  .config(function($routeProvider, $locationProvider, $httpProvider) {
    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/api/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          $timeout(deferred.resolve, 0);

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    //================================================
    
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.responseInterceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          // Success: just return the response
          function(response){
            return response;
          },
          // Error: check the error status to get only the 401
          function(response) {
            if (response.status === 401)
              $location.url('/login');
            return $q.reject(response);
          }
        );
      }
    });
    //================================================
    
    //================================================
    // Define all the routes
    //================================================
    
    $routeProvider
      .when('/', {
        templateUrl: '/views/piratebox/partials/chat.html',
        controller: 'ChatCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    //================================================
    
  }) // end of config()
  .run(function($rootScope, $http){
      
    $rootScope.switchConnected = function() {
        $http.post('/api/switchConnected');        
    };

    // Logout function is available in any pages
    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('/api/logout');
    };
  });
