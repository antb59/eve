var gutil = require('gulp-util');

var ptor;
var testUtils;

beforeEach(function() {
    ptor = protractor.getInstance();
    testUtils = require('../test_functions.js');
});

describe('WAFA Mobile - MyMessages Test', function() {
    it('should log and access to myMessages view', function() {
        browser.get('#/app/login');
        // log as wafa/wafa
        testUtils.login('wafa','wafa');
        testUtils.openLeftMenu();
        var myMessageLinkElement = by.xpath('//ion-item[@ui-sref="app.myMessages()"]');
        expect(ptor.isElementPresent(myMessageLinkElement)).toBe(true);
        element(myMessageLinkElement).click();
        expect(ptor.getCurrentUrl()).toContain('app/myMessages');     
    });
    
    it('should display message detail', function() {
        testUtils.selectFirstElementOfList('line in messageList');
        expect(ptor.getCurrentUrl()).toContain('app/message/1');        
    });
    
});