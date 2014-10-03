angular.module('pirateBoxApp').controller('ChatCtrl', function pluginsCtrl($scope, $http, $templateCache) {

    var sock = new SockJS('http://localhost:80/chat');
    $scope.messages = [];
    $scope.sendMessage = function() {
        console.log("send message");
        sock.send($scope.messageText);
        $scope.messageText = "";
    };

    sock.onmessage = function(e) {
        $scope.messages.push(e.data);
        $scope.$apply();
    };

});


