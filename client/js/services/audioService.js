// Define a simple audio service 
angular.module('eveApp').factory('audioService', function($document) {
    var audioElement = $document[0].createElement('audio'); // <-- Magic trick here
    return {
        audioElement: audioElement,

        play: function(filename) {
            audioElement.src = filename;
            audioElement.load();
            audioElement.play(); //  <-- Thats all you need
        }
        // Exersise for the reader - extend this service to include other functions
        // like pausing, etc, etc.

    }
});