var gutil = require('gulp-util');

var ptor;
var testUtils;

beforeEach(function() {
    ptor = protractor.getInstance();
    testUtils = require('../test_functions.js');
});

describe('WAFA Mobile - MyList Test', function() {
        
    it('should log and access to order list view', function() {
        browser.get('#/app/login');
        // log as wafa/wafa
        testUtils.login('wafa','wafa');
        testUtils.openLeftMenu();
        var myListLinkElement = by.xpath('//ion-item[@ui-sref="app.orderList()"]');
        expect(ptor.isElementPresent(myListLinkElement)).toBe(true);
        element(myListLinkElement).click();
        expect(ptor.getCurrentUrl()).toContain('app/orderList');     
    });
    
    it('should have Actions tab', function() {
        //be sure to be in Actions tab
        testUtils.selectTab("changeTab(\'Actions\')");
    });
    
    it('should be able to get detail of an order', function() {
        //get list of news and click on the first one
        testUtils.selectFirstElementOfList('orderSecurity in ordersSecurities');
        browser.sleep(3000);
        //be sure to have the detail of the order
        expect(ptor.getCurrentUrl()).toContain('/app/order/W40901000001');
    });
    
    it('should be able to modify an order', function() {
        // get the button to modify the order
        var buttonModifyElement = by.css('[ng-click="modifyOrder(selectedOrder.orderID)"]');
        expect(ptor.isElementPresent(buttonModifyElement)).toBe(true);
        //and click on it
        element(buttonModifyElement).click();
    });
    
    it('should be able to change quantity', function() {
        //change quantity
        var quantityInputElement = by.model("order.quantity");
        expect(ptor.isElementPresent(quantityInputElement)).toBe(true);
        element(quantityInputElement).sendKeys('10');
    });
    
    it('should be able to confirm modifications', function() {
        //confirm modifications
        var buttonConfirmModifyElement = by.css('[ng-click="checkModify()"]');
        expect(ptor.isElementPresent(buttonConfirmModifyElement)).toBe(true);
        element(buttonConfirmModifyElement).click();
    });
    
    it('should be able to confirm resume', function() {
        //confirm resume
        var buttonConfirmResumeElement = by.css('[ng-click="confirmModify()"]');
        expect(ptor.isElementPresent(buttonConfirmResumeElement)).toBe(true);
        element(buttonConfirmResumeElement).click();
        //back to list of order
        testUtils.selectFirstElementOfList('button in buttons');
        expect(ptor.getCurrentUrl()).toContain('app/orderList');          
    });
    
    it('should have OPCVM tab', function() {
        //be sure to be in OPCVM tab
        testUtils.selectTab("changeTab(\'OPCVM\')");
        browser.sleep(3000);
        //get list of trends and click on the first one
        testUtils.selectFirstElementOfList('orderSecurity in ordersSecurities');
        expect(ptor.getCurrentUrl()).toContain('app/order/opcvm/W40811000001');
        
    });
    
    it('should be able to cancel order', function() {
        var buttonCancelOrderElement = by.css('[ng-click="cancelOrder()"]');
        expect(ptor.isElementPresent(buttonCancelOrderElement)).toBe(true);
        element(buttonCancelOrderElement).click();
        
        testUtils.selectFirstElementOfList('button in buttons');
        testUtils.goback();
    });
    
    
    it('should have transfer tab', function() {
        //be sure to be in transfer tab
        testUtils.selectTab("changeTab(\'Transfers\')");
        testUtils.selectFirstElementOfList('transfer in transfersList');
        expect(ptor.getCurrentUrl()).toContain('app/transfer/C406040001');
        testUtils.goback();
    });
    
    it('should have icon search on the top right', function() {
        // get right search element and click on it
        var rightSearchIconElement = by.css('[ng-click="openSearch()"]');
        expect(ptor.isElementPresent(rightSearchIconElement)).toBe(true);
    });
    
});