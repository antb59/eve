//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('OrderCtrl', function() {
    var controllerFactory, scope, orderService;

    function createController() {
        return controllerFactory('OrderCtrl', {
            $scope: scope,
            OrderService: orderService
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
        orderService = buildOrderServiceMock($q);
    }));
    
    // Test variable selectedOrderId not null
    it('should have variable selectedOrderId not null', function(){
        createController();
        dump("[orderCtrlTest] Test variable selectedOrderId value not null");
        expect(scope.selectedOrderId).not.toBe('null');
    });
    
    // Test variable selectedOrder not null
    it('should have variable selectedOrder not null', function(){
        createController();
        dump("[orderCtrlTest] Test variable selectedOrder value not null");
        expect(scope.selectedOrder).not.toBe('null');
    });

    // Test set of cancelOrder function
    it('should set cancelOrder function', function() {
        createController();
        dump("[orderCtrlTest] Test set of cancelOrder function");
        expect(scope.cancelOrder).toBeDefined();
    });

    // Test set of modifyOrder function
    it('should set modifyOrder function', function() {
        createController();
        dump("[orderCtrlTest] Test set of modifyOrder function");
        expect(scope.modifyOrder).toBeDefined();
    });
    
    // Test set of closeModifyOrderModal function
    it('should set closeModifyOrderModal function', function() {
        createController();
        dump("[orderCtrlTest] Test set of closeModifyOrderModal function");
        expect(scope.closeModifyOrderModal).toBeDefined();
    });
});