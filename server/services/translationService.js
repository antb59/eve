var eventsService = require('./eventsService');

var dictionnary = require('../i18n/lang_fr.json');

/*var dictionnaryRequest = JsonFileReader.readJsonFile("../i18n/lang_FR.json");
dictionnaryRequest.then(function(dataResolved) {  
    eventsService.store('EVE','DICTIONNARY LOADED');
    dictionnary = dataResolved;
},function(rejectReason) {
    console.error("Unable to retrieve dictionnary: " + rejectReason);
    dictionnary = [];
},function(notifyValue) {
    console.log("Retrieving dictionnary");
});*/



module.exports.translate = function(key) {
    if(dictionnary[key])
        return dictionnary[key];
    return key;
};