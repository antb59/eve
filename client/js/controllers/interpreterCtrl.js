angular.module('eveApp').controller('interpreterCtrl', function interpreterCtrl($scope, $http, $templateCache) {

    $scope.commandResult = '';
    $scope.interpret = function() {
        console.log('Interpreting');
        var interpreterFormData = {
            command: {
                message: this.messageText
            }
        };

        if (this.messageText.trim() === "")
            return;

         $http.post('/api/interpretCommand',interpreterFormData).success(function(response) {
            $scope.commandResult = response.command;
            console.log($scope.commandResult);
        }).
        error(function(response) {
            $scope.commandResult = response.status + ' - ' + response.command;
            console.log($scope.commandResult);
        });
        
        this.messageText = '';
    };

});