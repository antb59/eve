var gutil = require('gulp-util');

var ptor;
var testUtils;

beforeEach(function() {
    ptor = protractor.getInstance();
    testUtils = require('../test_functions.js');
});

describe('WAFA Mobile - MyAlerts Test', function() {
    
    it('should log and access to alert list view', function() {
        browser.get('#/app/login');
        // log as wafa/wafa
        testUtils.login('wafa','wafa');
        testUtils.openLeftMenu();
        var myListLinkElement = by.xpath('//ion-item[@ui-sref="app.myAlerts()"]');
        expect(ptor.isElementPresent(myListLinkElement)).toBe(true);
        element(myListLinkElement).click();
        expect(ptor.getCurrentUrl()).toContain('app/myAlerts');     
    });
    
    it('should have myAlerts detail', function() {        
        //be sure to be in myAlert tab
        testUtils.selectTab("changeTab(\'MyAlerts\');");
        
        //get list of news and click on the first one
        testUtils.selectFirstElementOfList('line in alertOrderLines');
        expect(ptor.getCurrentUrl()).toContain('app/alert/1/ordres');
        testUtils.goback();
    });
    
    it('should have CreateAlert detail', function() {
        //be sure to be in CreateAlert tab
        testUtils.selectTab("changeTab(\'CreateAlerts\')");
    });
    
    it('should be able to change price min', function() {
        //change quantity
        var priceMinInputElement = by.model("alert.minprice");
        expect(ptor.isElementPresent(priceMinInputElement)).toBe(true);
        element(priceMinInputElement).sendKeys('16');
    });
    
    it('should be able to change price max', function() {
        //change quantity
        var priceMaxInputElement = by.model("alert.maxprice");
        expect(ptor.isElementPresent(priceMaxInputElement)).toBe(true);
        element(priceMaxInputElement).sendKeys('12');
    });
    
    it('should be able to change volume', function() {
        //change quantity
        var totalMaxInputElement = by.model("alert.totalmax");
        expect(ptor.isElementPresent(totalMaxInputElement)).toBe(true);
        element(totalMaxInputElement).sendKeys('100');
    });
    
    it('should be able to confirm creation', function() {
        //confirm modifications
        var buttonConfirmCreateElement = by.css('[ng-click="createAction()"]');
        expect(ptor.isElementPresent(buttonConfirmCreateElement)).toBe(true);
        element(buttonConfirmCreateElement).click();
        //select ok
        var listResult = by.repeater('button in buttons');
        expect(ptor.isElementPresent(listResult)).toBe(true);
        element.all(listResult).get(1).click();
        
        expect(ptor.getCurrentUrl()).toContain('app/myAlerts');
    });
    
    it('should have icon search on the top right', function() {
        // get right search element and click on it
        var rightSearchIconElement = by.css('[ng-click="openSearch()"]');
        expect(ptor.isElementPresent(rightSearchIconElement)).toBe(true);
    });
    
});