//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('ModifyAlertCtrl', function() {
    var controllerFactory, scope;

    function createController() {
        return controllerFactory('ModifyAlertCtrl', {
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
    }));

    // Test variable alert value
    it('should have variable alert not null', function(){
        createController();
        dump("[modifyAlertCtrlTest] Test variable alert value");
        expect(scope.alert).not.toBe('null');
    });
    
    // Test set of checkModify function
    it('should set checkModify function', function() {
        createController();
        dump("[modifyAlertCtrlTest] Test set of checkModify function");
        expect(scope.checkModify).toBeDefined();
    });

    // Test set of closeConfirmModifyOrderModal function
    it('should set closeConfirmModifyOrderModal function', function() {
        createController();
        dump("[modifyAlertCtrlTest] Test set of closeConfirmModifyOrderModal function");
        expect(scope.closeConfirmModifyOrderModal).toBeDefined();
    });

});