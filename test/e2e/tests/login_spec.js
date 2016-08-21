var gutil = require('gulp-util');

var ptor;
var testUtils;

beforeEach(function() {
    ptor = protractor.getInstance();
    testUtils = require('../test_functions.js');
});

describe('WAFA Mobile - Login Test', function() {
    
    it('should be try to log with wrong password', function() {
        browser.get('#/app/login');
        testUtils.login('wafa','waf');
        expect(ptor.getCurrentUrl()).not.toContain('app/infos');        
    });
    
    it('should try to log with right password', function() {
        browser.get('#/app/login');
        testUtils.login('wafa','wafa');
        expect(ptor.getCurrentUrl()).toContain('app/infos');
    });
    
    it('should be able to logout', function() {
        /*browser.get('#/app/infos');*/
        
        //Open Left Menu to logout        
        testUtils.openLeftMenu();

        //Should be able to logout
        var logoutLinkElement = by.css('[ng-click="logout()"]');
        expect(ptor.isElementPresent(logoutLinkElement)).toBe(true);
        element(logoutLinkElement).click();
                
        //Reopen left menu and check if it's not possible to logout again
        testUtils.openLeftMenu();
        expect(ptor.isElementPresent(logoutLinkElement)).toBe(false);
    });
    
    
});