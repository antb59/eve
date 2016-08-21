var gutil = require('gulp-util');

var ptor;
var testUtils;

beforeEach(function() {
    ptor = protractor.getInstance();
    testUtils = require('../test_functions.js');
});

describe('WAFA Mobile - Infos Test', function() {
    
    it('should have news detail', function() {
        browser.get('#/app/infos');
        
        //be sure to be in news tab
        testUtils.selectTab("changeTab(\'News\')");
        
        //get list of news and click on the first one
        testUtils.selectFirstElementOfList('info in news');
        expect(ptor.getCurrentUrl()).toContain('app/news/infos');
    });
    
    it('should have trend detail', function() {
        browser.get('#/app/infos');
        
        //be sure to be in trend tab
        testUtils.selectTab("changeTab(\'Trend\')");
                
        //get list of trends and click on the first one
        testUtils.selectFirstElementOfList('info in trend');
        expect(ptor.getCurrentUrl()).toContain('app/news/trend');  
    });
    
    it('should have icon search on the top right', function() {
        // get right search element and click on it
        var rightSearchIconElement = by.css('[ng-click="openSearch()"]');
        expect(ptor.isElementPresent(rightSearchIconElement)).toBe(true);
    });
    
});