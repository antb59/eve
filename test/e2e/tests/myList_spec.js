var gutil = require('gulp-util');

var ptor;
var testUtils;

beforeEach(function() {
    ptor = protractor.getInstance();
    testUtils = require('../test_functions.js');
});

describe('WAFA Mobile - MyList Test', function() {
    
    it('should have actions Tab', function() {
        browser.get('#/app/myList');
        
        //be sure to be in actions tab
        testUtils.selectTab("changeTab(\'Actions\')");
        
        //get list of news and click on the first one
        testUtils.selectFirstElementOfList('value in myListView');
        expect(ptor.getCurrentUrl()).toContain('app/valueDetails');
    });
    
    it('should have OPCVM Tab', function() {
        browser.get('#/app/myList');
        
        //be sure to be in OPCVM tab
        testUtils.selectTab("changeTab(\'OPCVM\')");
    });
    
    it('should have trash icon on the top right', function() {
        // get right trash icon
        testUtils.selectTab("changeTab(\'Actions\')");
        var rightTrashIconElement = by.css('[ng-click="changeEditMode()"]');
        expect(ptor.isElementPresent(rightTrashIconElement)).toBe(true);
        //then click
        element(rightTrashIconElement).click();
        // and check if the element is present
        var deleteActionIcon = by.css('[ng-click="removeAction(\'MA0000800831\', \'\')"]');
        expect(ptor.isElementPresent(rightTrashIconElement)).toBe(true);
    });
    
    it('should have adding icon on the top right', function() {
        // get right adding icon and click on it
        var rightAddIconElement = by.css('[ng-click="openSelectValue()"]');
        expect(ptor.isElementPresent(rightAddIconElement)).toBe(true);
        expect(ptor.isElementPresent(by.model('valueSearched'))).toBe(true);
    });
});