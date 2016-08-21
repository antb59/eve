var gutil = require('gulp-util');

var ptor;

beforeEach(function() {
    ptor = protractor.getInstance();
});

describe('WAFA Mobile - search function Test', function() {
    it('should be present', function() {
        browser.get('#/app/infos');
        // get right search element and click on it
        var rightSearchIconElement = by.css('[ng-click="openSearch()"]');
        expect(ptor.isElementPresent(rightSearchIconElement)).toBe(true);
        element(rightSearchIconElement).click();
        
        // get input text, add set text and click on the first element
        var inputSearchElement = by.model('valueSearched');
        expect(ptor.isElementPresent(inputSearchElement)).toBe(true);
        element(inputSearchElement).sendKeys("ATI", protractor.Key.ENTER);
        var searchResultList = by.repeater('result in searchResults');
        expect(ptor.isElementPresent(searchResultList)).toBe(true);
        element.all(searchResultList).first().click();
        
        // finally, check value of the label
        var labelElement = by.xpath('//div[@id="vd-header-label-col"]');
        expect(ptor.isElementPresent(labelElement)).toBe(true);
        expect(element(labelElement).getText()).toEqual('MASI');
    });
});