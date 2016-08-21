//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('RankingCtrl', function() {
    var controllerFactory, scope, accountService;

    function createController() {
        return controllerFactory('RankingCtrl', {
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

    // Test variable best value not null
    it('should have variable best not null', function(){
        createController();
        dump("rankingCtrlTest] Test variable best value not null");
        expect(scope.best).not.toBe('null');
    });
    
    // Test variable worst value not null
    it('should have variable worst not null', function(){
        createController();
        dump("rankingCtrlTest] Test variable worst value not null");
        expect(scope.worst).not.toBe('null');
    });
    
    // Test variable volume value not null
    it('should have variable volume not null', function(){
        createController();
        dump("rankingCtrlTest] Test variable volume value not null");
        expect(scope.volume).not.toBe('null');
    });
});