//https://www.npmjs.org/package/protractor-html-screenshot-reporter
var HtmlReporter = require('protractor-html-screenshot-reporter');

exports.config = {
    // Do not start a Selenium Standalone sever - only run this using chrome.
    chromeOnly: true,
    chromeDriver: 'selenium/chromedriver',
    // The file paths to the selenium server jar and chromedriver
    seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',
    chromeDriver: '../../node_modules/protractor/selenium/chromedriver',
    //splitTestsBetweenCapabilities: true,

    
    //************ TO RUN ONLY ONE INSTANCE **********************//
    
    // Capabilities to be passed to the webdriver instance.
    /*capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            args: ['--test-type', '--window-size=360,640']}
    },*/
    
    //************* TO RUN SEVERAL INSTANCES *********************//
    multiCapabilities: [
        {
            'browserName': 'chrome',
            'chromeOptions': {//Apple iPhone 4 definition
                args: ['--test-type', '--window-size=640,960']}
        }/*,
        {
            'browserName': 'chrome',
            'chromeOptions': {//Apple iPhone 5 definition
                args: ['--test-type', '--window-size=640,1136']}
        },
        {
            'browserName': 'chrome',
            'chromeOptions': {//Google Nexus 5 definition
                args: ['--test-type', '--window-size=720,1280']}
        },
        {
            'browserName': 'chrome',
            'chromeOptions': {//Samsung Galaxy S definition
                args: ['--test-type', '--window-size=1080,1920']}
        }*/
    ],


    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['test/e2e/**/*_spec.js'],
    
   
    
    onPrepare: function() {
      // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
      jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: 'tmp/screenshots',
        takeScreenShotsOnlyForFailedSpecs: true
      }));
   },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        // If true, print colors to the terminal.
        showColors: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 30000
    }
};