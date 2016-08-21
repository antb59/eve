//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('infosCtrl', function() {
    var controllerFactory, scope;

    function createController() {
        return controllerFactory('infosCtrl', {
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

    // Test variable currentTab value
    it('should have variable currentTab = "News"', function(){
        createController();
        dump("[infosCtrlTest] Test variable currentTab value");
        expect(scope.currentTab).toBe('News');
    });
    
    // Test set of changeTab function
    it('should set changeTab function', function() {
        createController();
        dump("[infosCtrlTest] Test set of changeTab function");
        expect(scope.changeTab).toBeDefined();
    });
});