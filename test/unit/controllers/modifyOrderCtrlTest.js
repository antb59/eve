//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('ModifyOrderCtrl', function() {
    var controllerFactory, scope, selectedOrder;

    function createController() {
        return controllerFactory('ModifyOrderCtrl', {
            $scope: scope
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
        scope.selectedOrder = {id: "W407110000001",
                       side: 'Achat', 
                       quantity: '12', 
                       type: 'A tout prix', 
                       limitPrice: undefined, 
                       stopPrice: undefined, 
                       validityType: 'Jour', 
                       validityDate: '11/07/2014  16:30',
                       amount: '22'};
    }));

    // Test set of checkModify function
    it('should set checkModify function', function() {
        createController();
        dump("[modifyOrderCtrlTest] Test set of checkModify function");
        expect(scope.checkModify).toBeDefined();
    });

    // Test set of closeConfirmTradeModal function
    it('should set closeConfirmTradeModal function', function() {
        createController();
        dump("[modifyOrderCtrlTest] Test set of closeConfirmTradeModal function");
        expect(scope.closeConfirmTradeModal).toBeDefined();
    });
    
    // Test set of closeConfirmModifyOrderModal function
    it('should set closeConfirmModifyOrderModal function', function() {
        createController();
        dump("[modifyOrderCtrlTest] Test set of closeConfirmModifyOrderModal function");
        expect(scope.closeConfirmModifyOrderModal).toBeDefined();
    });
});