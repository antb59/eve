var gutil = require('gulp-util');

var ptor;
var testUtils;

beforeEach(function() {
    ptor = protractor.getInstance();
    testUtils = require('../test_functions.js');
});

describe('WAFA Mobile - MyAccounts Test', function() {
    it('should log and access to myAccount view', function() {
        browser.get('#/app/login');
        // log as wafaa/wafa
        testUtils.login('wafa','wafa');
        testUtils.openLeftMenu();
        var myAccountLinkElement = by.xpath('//ion-item[@ui-sref="app.myAccounts()"]');
        expect(ptor.isElementPresent(myAccountLinkElement)).toBe(true);
        element(myAccountLinkElement).click();
        expect(ptor.getCurrentUrl()).toContain('app/myAccounts');     
    });
    
    it('should display Synthese Tab', function() {
        testUtils.selectTab('changeTab(\'Synthese\')');
        var listAccountElement = by.model('selectedAccount');
        expect(ptor.isElementPresent(listAccountElement)).toBe(true);
    });
    
    it('should display Accounrs tab and select first position', function() {        
        testUtils.selectTab('changeTab(\'Accounts\')');
        testUtils.selectFirstElementOfList('titre in selectedSituation.accountPosition');
        expect(ptor.getCurrentUrl()).toContain('app/valueDetails');
    });
    
});