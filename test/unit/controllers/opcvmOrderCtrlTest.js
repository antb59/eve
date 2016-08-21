//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('OpcvmOrderCtrl', function() {
    var controllerFactory, scope, accountService;

    function createController() {
        return controllerFactory('OpcvmOrderCtrl', {
            $scope: scope,
            AccountService: accountService,
            orderService : orderService
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
        orderService = buildOrderServiceMock($q);
    }));
    
    // Test variable selectedOrderId not null
    it('should have variable selectedOrderId not null', function(){
        createController();
        dump("[opcvmOrderCtrlTest] Test variable selectedOrderId value not null");
        expect(scope.selectedOrderId).not.toBe('null');
    });
    
    // Test variable selectedOrder not null
   it('should have variable selectedOrder not null', function(){
        createController();
        dump("[opcvmOrderCtrlTest] Test variable selectedOrder value not null");
        expect(scope.selectedOrder).not.toBe('null');
    });

    // Test set of cancelOrder function
    it('should set cancelOrder function', function() {
        createController();
        dump("[opcvmOrderCtrlTest] Test set of cancelOrder function");
        expect(scope.cancelOrder).toBeDefined();
    });
});