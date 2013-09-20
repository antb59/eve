angular.module('eveApp').controller('speakCtrl', function speakCtrl($scope, $http, $templateCache, audioService) {

    $scope.errorMessage = '';
    $scope.speak = function() {
        console.log('Speaking');
        var speakFormData = {
            speak: {
                message: this.messageText
            }
        };

        if (this.messageText.trim() === "")
            return;

        /*var audioTagSupport = $scope.speakerAudio.canPlayType;
        
        if (!audioTagSupport)
            $scope.errorMessage = "Audio tag is not supported by your browser";*/
            
        audioService.play('http://translate.google.com/translate_tts?tl=fr&q=' + encodeURIComponent(this.messageText.trim()));
            
        this.messageText = '';
    };

});