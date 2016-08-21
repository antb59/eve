//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('NewsCtrl', function() {
    var controllerFactory, scope, accountService;

    function createController() {
        return controllerFactory('NewsCtrl', {
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

    // Test variable selectedNewsId not null
    it('should have variable selectedNewsId not null', function(){
        createController();
        dump("[newsCtrlTest] Test variable selectedNewsId value not null");
        expect(scope.selectedNewsId).not.toBe('null');
    });
    
    // Test variable selectedNews not null
    it('should have variable selectedNews not null', function(){
        createController();
        dump("[newsCtrlTest] Test variable selectedNews value not null");
        expect(scope.selectedNews).not.toBe('null');
    });
});