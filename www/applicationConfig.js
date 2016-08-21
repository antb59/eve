'use strict';
//http://newtriks.com/2013/11/29/environment-specific-configuration-in-angularjs-using-grunt/
//http://stackoverflow.com/questions/16930473/angularjs-factory-http-get-json-file
//http://mindthecode.com/how-to-use-environment-variables-in-your-angular-application/
//http://chariotsolutions.com/blog/post/angularjs-corner-using-promises-q-handle-asynchronous-calls/
angular.module('eve.config', [])
.constant('configuration', {
    name: "Eve",
    version: "0.0.1",
    environment: "DEV",
    lang: "fr",
    applicationMode: "PRODUCTION",
    mockupPath: "resources/",
    webServiceURL: "http://localhost:7777/api/",
    dictionnary: {}
});