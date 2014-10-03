angular.module('eveApp').controller('headerCtrl', function headerCtrl($scope, $http, $templateCache) {


    $scope.userLogged = null;

    $scope.getUserLogged = function() {
        console.log('Getting UserLoggedIn');

        $http.get('/api/loggedin').success(function(response) {
             console.log('Response LoggedIn : ' + response);
            if (response == 0)
                $scope.userLogged = null;
            else 
                $scope.userLogged = response;
        }).
        error(function(response) {
            console.log('Error Response LoggedIn : ' + response);
            $scope.userLogged = null;
        });
    }

    $scope.getUserLogged();

});