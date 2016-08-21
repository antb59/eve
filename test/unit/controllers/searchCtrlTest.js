//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('SearchCtrl', function() {
    var controllerFactory, scope, accountService;

    function createController() {
        return controllerFactory('SearchCtrl', {
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

    // Test set of searchValue function
    it('should set searchValue function', function() {
        createController();
        dump("[searchCtrlTest] Test set of searchValue function");
        expect(scope.searchValue).toBeDefined();
    });

    // Test set of selectValue function
    it('should set selectValue function', function() {
        createController();
        dump("[searchCtrlTest] Test set of selectValue function");
        expect(scope.selectValue).toBeDefined();
    });
    
    // Test variable searchResults value not null
    it('should have variable searchResults not null', function(){
        createController();
        dump("selectedValue] Test variable searchResults value not null");
        expect(scope.searchResults).not.toBe('null');
    });
    
    // Test variable valueSearched value not null
    it('should have variable valueSearched not null', function(){
        createController();
        dump("searchCtrlTest] Test variable valueSearched value not null");
        expect(scope.valueSearched).not.toBe('null');
    });
    
    // Test variable selectedValue value not null
    it('should have variable selectedValue not null', function(){
        createController();
        dump("searchCtrlTest] Test variable selectedValue value not null");
        expect(scope.selectedValue).not.toBe('null');
    });
    
    
    
   });