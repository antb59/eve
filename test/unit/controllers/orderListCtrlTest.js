//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('OrderListCtrl', function() {
    var controllerFactory, scope, accountService;

    function createController() {
        return controllerFactory('OrderListCtrl', {
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
    }));
    
    // This beforeEach is used to set up common variables, dependencies or functions
    beforeEach(inject(function ($q) {
        accountService = buildAccountServiceMock($q);
    }));
    
    // Test variable currentTab value
    it('should have variable currentTab = "Actions"', function(){
        createController();
        dump("[orderListCtrlTest] Test variable currentTab value");
        expect(scope.currentTab).toBe('Actions');
    });
    
    // Test variable ordersSecurities value not null
    it('should have variable ordersSecurities not null', function(){
        createController();
        dump("[orderListCtrlTest] Test variable ordersSecurities value not null");
        expect(scope.ordersSecurities).not.toBe('null');
    });

    // Test set of changeTab function
    it('should set changeTab function', function() {
        createController();
        dump("[orderListCtrlTest] Test set of changeTab function");
        expect(scope.changeTab).toBeDefined();
    });
});