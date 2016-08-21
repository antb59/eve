var gutil = require('gulp-util');

var ptor;
var testUtils;

beforeEach(function() {
    ptor = protractor.getInstance();
    testUtils = require('../test_functions.js');
});

describe('WAFA Mobile - Test market view', function() {
    it('should display list of Actions and click on the first one', function() {
        browser.get('#/app/markets');
        testUtils.selectTab("changeTab(\'marketsCard\');changeMarketTab(\'Actions\')");
        testUtils.selectTab("changeMarketTab(\'Actions\')");
        
        testUtils.selectFirstElementOfList("value in actions");
        expect(ptor.getCurrentUrl()).toContain('app/valueDetails');
    });
    
    it('should display list of Droits and click on the first one', function() {
        browser.get('#/app/markets');
        testUtils.selectTab("changeTab(\'marketsCard\');changeMarketTab(\'Actions\')");
        testUtils.selectTab("changeMarketTab(\'Droits\')");
        testUtils.selectFirstElementOfList("value in droits");
        browser.sleep(3000);
        expect(ptor.getCurrentUrl()).toContain('app/valueDetails');
    });
    
    it('should display list of OPCVM and click on the first one', function() {
        browser.get('#/app/markets');
        testUtils.selectTab("changeTab(\'marketsCard\');changeMarketTab(\'Actions\')");
        testUtils.selectTab("changeMarketTab(\'OPCVM\')");
        
        testUtils.selectFirstElementOfList("value in OPCVM");
        expect(ptor.getCurrentUrl()).toContain('app/valueDetails');
    });
    
    it('should display masi data', function() {
        browser.get('#/app/markets');
        testUtils.selectTab("changeTab(\'Masi\')");
        // TODO
    });
    
    it('should display best ranking and click on the first one', function() {
        browser.get('#/app/markets');
        testUtils.selectTab("changeTab(\'Ranking\');changeRankTab(\'best\')");
        testUtils.selectTab("changeRankTab(\'best\')");
        
        testUtils.selectFirstElementOfList("bestValue in best");
    });
    
    it('should display worst ranking and click on the first one', function() {
        browser.get('#/app/markets');
        testUtils.selectTab("changeTab(\'Ranking\');changeRankTab(\'best\')");
        testUtils.selectTab("changeRankTab(\'worst\')");
        
        testUtils.selectFirstElementOfList("worstValue in worst");
    });
    
    it('should display volume ranking and click on the first one', function() {
        browser.get('#/app/markets');
        testUtils.selectTab("changeTab(\'Ranking\');changeRankTab(\'best\')");
        testUtils.selectTab("changeRankTab(\'volume\')");
        
        testUtils.selectFirstElementOfList("volumeValue in volume");
    });
    
    it('should display list of Actions, click on the first one and try back button', function() {
        browser.get('#/app/markets');
        testUtils.selectTab("changeTab(\'marketsCard\');changeMarketTab(\'Actions\')");
        testUtils.selectTab("changeMarketTab(\'Actions\')");
        
        testUtils.selectFirstElementOfList("value in actions");
        
        var backButtonElement = by.css('.button-clear');
        expect(ptor.isElementPresent(backButtonElement)).toBe(true);                                
        element(backButtonElement).click();
    });
    
    it('should have icon search on the top right', function() {
        // get right search element and click on it
        var rightSearchIconElement = by.css('[ng-click="openSearch()"]');
        expect(ptor.isElementPresent(rightSearchIconElement)).toBe(true);
    });
    
    
});