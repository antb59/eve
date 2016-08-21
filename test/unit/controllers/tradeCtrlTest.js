//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('TradeCtrl', function() {
    var controllerFactory, scope, accountService, isin;

    function createController() {
        return controllerFactory('TradeCtrl', {
            $scope: scope,
            AccountService: accountService
        });
    }

    // This beforeEach is used to load wfs-app-mobile module
    beforeEach(module('wfs-app-mobile'));

    // This beforeEach is used to resolve references
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        // This save a reference for the controller & calling it in the createController function
        // later will use in each unit test
        controllerFactory = $controller;
        scope.selectedValue = {isin : "MA0000011926"};
    }));
    
    // This beforeEach is used to set up common variables, dependencies or functions
    beforeEach(inject(function ($q) {
        accountService = buildAccountServiceMock($q);
        
    }));

    // Test set of checkTrade function
    it('should set checkTrade function', function() {
        createController();
        dump("[tradeCtrlTest] Test set of checkTrade function");
        expect(scope.checkTrade).toBeDefined();
    });

    // Test set of closeConfirmTradeModal function
    it('should set closeConfirmTradeModal function', function() {
        createController();
        dump("[tradeCtrlTest] Test set of closeConfirmTradeModal function");
        expect(scope.closeConfirmTradeModal).toBeDefined();
    });
});