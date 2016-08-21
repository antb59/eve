//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('AppCtrl', function() {
    var controllerFactory, scope, authenticationService;

    function createController() {
        return controllerFactory('AppCtrl', {
            $scope: scope,
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
        authenticationService = buildAuthenticationServiceMock($q);
    }));

    // Test set of openSearch function
    it('should set openSearch function', function() {
        createController();
        dump("[appCtrlTest] Test set of openSearch function");
        expect(scope.openSearch).toBeDefined();
    });

    // Test set of closeSearch function
    it('should set closeSearch function', function() {
        createController();
        dump("[appCtrlTest] Test set of closeSearch function");
        expect(scope.closeSearch).toBeDefined();
    });
    
    // Test set of openLoginModal function
    it('should set openLoginModal function', function() {
        createController();
        dump("[appCtrlTest] Test set of openLoginModal function");
        expect(scope.openLoginModal).toBeDefined();
    });
    
    // Test set of closeLoginModal function
    it('should set closeLoginModal function', function() {
        createController();
        dump("[appCtrlTest] Test set of closeLoginModal function");
        expect(scope.closeLoginModal).toBeDefined();
    });
    
     // Test set of logout function
    it('should set logout function', function() {
        createController();
        dump("[appCtrlTest] Test set of logout function");
        expect(scope.logout).toBeDefined();
    });
    
     // Test set of isLoggedIn function
    it('should set isLoggedIn function', function() {
        createController();
        dump("[appCtrlTest] Test set of isLoggedIn function");
        expect(scope.isLoggedIn).toBeDefined();
    });
});