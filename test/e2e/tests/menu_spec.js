var gutil = require('gulp-util');

var ptor;
var testUtils;

beforeEach(function() {
    ptor = protractor.getInstance();
    testUtils = require('../test_functions.js');
});

describe('WAFA Mobile - Left Menu Tests', function() {
    it('should open left menu', function() {
        browser.get('#/app/infos');
        testUtils.openLeftMenu();
    });
    
    it('should be able to search from the menu', function(){
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
    
   /* it('should have written user name on the bottom of the left menu', function() {
        browser.get('#/app/login');
        testUtils.login("wafa","wafa");
        testUtils.openLeftMenu();
        var leftmenunameElement = by.xpath('//div[@class="item left-menu-login"]');
        expect(element(leftmenunameElement).getText()).toContain('Wafa WAFA');
    });
    */
});