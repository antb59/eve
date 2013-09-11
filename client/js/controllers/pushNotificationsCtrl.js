function pushNotificationsCtrl($scope, $http, $templateCache) {

    $scope.codeStatus = '';
    $scope.sendNotification = function() {
        console.log('Notification a envoyer : ' + $scope.titleText + ' - ' + $scope.messageText);

        var notificationFormData = {
            notification: {
                title: this.titleText,
                message: this.messageText
            }
        };

        var jdata = 'notification:'+JSON.stringify(notificationFormData);

        console.log("jdata= " + jdata);

        $http.post('/api/sendNotification',notificationFormData).success(function(response) {
            console.log("pushNotification successfully sent");
            $scope.codeStatus = response.data;
            console.log($scope.codeStatus);
        }).
        error(function(response) {
            console.log("pushNotification error during sending"); // Getting Error Response in Callback
            $scope.codeStatus = response || "Request failed";
            console.log($scope.codeStatus);
        });

        $scope.titleText = 'Bernard';
        $scope.messageText = '';
    };

}