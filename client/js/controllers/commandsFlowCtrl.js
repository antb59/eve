angular.module('eveApp').controller('commandsFlowCtrl', function commandsFlowCtrl($scope, $http, $templateCache) {

    // the last received msg
    $scope.commandsFlow = {};

    // handles the callback from the received event
    var handleCallback = function(msg) {
        var receivedMsg = JSON.parse(msg.data);
        console.log("Message received : " + receivedMsg.info);
        $scope.$apply(function() {
            $scope.commandsFlow = JSON.parse(msg.data);
        });
    }

    var source = new EventSource('/api/commandsFlow');
    source.addEventListener('message', handleCallback, false);
    
});