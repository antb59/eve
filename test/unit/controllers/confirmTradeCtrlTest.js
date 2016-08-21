//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('ConfirmTradeCtrl', function() {
    var controllerFactory, scope;

    function createController() {
        return controllerFactory('ConfirmTradeCtrl', {
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

    // Test set of closeTradeConfirmed function
    it('should set closeTradeConfirmed function', function() {
        createController();
        dump("[ConfirmTradeCtrl] Test set of closeTradeConfirmed function");
        expect(scope.closeTradeConfirmed).toBeDefined();
    });

});