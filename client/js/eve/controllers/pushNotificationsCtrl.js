angular.module('eveApp').controller('pushNotificationsCtrl', function pushNotificationsCtrl($scope, $http, $templateCache) {

    $scope.codeStatus = '';
    $scope.pushNotification = function() {
        console.log('Pushing Notification');

        var notificationFormData = {
            notification: {
                title: this.titleText,
                message: this.messageText
            }
        };

        $http.post('/api/pushNotification',notificationFormData).success(function(response) {
            console.log(response)
            //$scope.codeStatus = response.status + ' - ' + response.message;
            //console.log($scope.codeStatus);
        }).
        error(function(response) {
            //$scope.codeStatus = response.status + ' - ' + response.message;
            //console.log($scope.codeStatus);
        });

        $scope.titleText = '';
        $scope.messageText = '';
    };

});