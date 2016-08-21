//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('AlertCtrl', function() {
    var controllerFactory, scope, alertService;

    function createController() {
        return controllerFactory('AlertCtrl', {
            $scope: scope,
            AlertService: alertService
        });
    }

    // This beforeEach is used to load wafa-app-mobile module
    beforeEach(module('wafa-app-mobile'));

    // This beforeEach is used to resolve references
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        // This save a reference for the controller & calling it in the createController function
        // later will use in each unit test
        controllerFactory = $controller;
    }));
    
    // This beforeEach is used to set up common variables, dependencies or functions
    beforeEach(inject(function ($q) {
        alertService = buildAlertServiceMock($q);
    }));

    // Test set of deleteAlerte function
    it('should set deleteAlert function', function() {
        createController();
        dump("[alertCtrlTest] Test set of deleteAlerte function");
        expect(scope.deleteAlert).toBeDefined();
    });

    // Test set of cancelModifyAlert function
    it('should set cancelModifyAlert function', function() {
        createController();
        dump("[alertCtrlTest] Test set of cancelModifyAlert function");
        expect(scope.cancelModifyAlert).toBeDefined();
    });
    
    // Test set of modifyAlert function
    it('should set modifyAlert function', function() {
        createController();
        dump("[alertCtrlTest] Test set of modifyAlert function");
        expect(scope.modifyAlert).toBeDefined();
    });
    
    // Test set of closeModifyAlertModal function
    it('should set closeModifyAlertModal function', function() {
        createController();
        dump("[alertCtrlTest] Test set of closeModifyAlertModal function");
        expect(scope.closeModifyAlertModal).toBeDefined();
    });
});