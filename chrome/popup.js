document.write("ABE : OK OK OK");
var automaticFill = false;

function setChildTextNode(elementId, text) {
    document.getElementById(elementId).innerText = text;
}

// Tests the roundtrip time of sendRequest().
function testRequest() {
    setChildTextNode("resultsRequest", "running...");
    automaticFill = !automaticFill;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.sendRequest(tab.id, automaticFill, function handler(response) {
            setChildTextNode("resultsRequest", response);
        });
    });


    //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    //});
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#testRequest').addEventListener(
        'click', testRequest);
});