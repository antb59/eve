//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('MyAccountsCtrl', function() {
    var controllerFactory, scope, accountService, backOfficeService;

    function createController() {
        return controllerFactory('MyAccountsCtrl', {
            $scope: scope,
            AccountService: accountService,
            BackOfficeService: backOfficeService
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
        backOfficeService = buildBackOfficeServiceMock($q);
    }));
    
    // Test variable accounts value
    it('should have variable accounts not null', function(){
        createController();
        dump("[myAccountsCtrlTest] Test variable accounts value not null");
        expect(scope.accounts).not.toBe('null');
    });
    
    // Test variable selectedAccount value
    it('should have variable selectedAccount not null', function(){
        createController();
        dump("[myAccountsCtrlTest] Test variable selectedAccount value not null");
        expect(scope.selectedAccount).not.toBe('null');
    });
    
    // Test variable situations value
    it('should have variable situations not null', function(){
        createController();
        dump("[myAccountsCtrlTest] Test variable situations value not null");
        expect(scope.situations).not.toBe('null');
    });
    
    // Test variable selectedSituation value
    it('should have variable selectedSituation not null', function(){
        createController();
        dump("[myAccountsCtrlTest] Test variable selectedSituation value not null");
        expect(scope.selectedSituation).not.toBe('null');
    });
    
    // Test variable titres value
    it('should have variable titres not null', function(){
        createController();
        dump("[myAccountsCtrlTest] Test variable titres value not null");
        expect(scope.titres).not.toBe('null');
    });
    
    // Test variable currentTab value
    it('should have variable currentTab  = Synthese', function(){
        createController();
        dump("[myAccountsCtrlTest] Test variable currentTab value");
        expect(scope.currentTab).toBe('Synthese');
    });

    // Test set of deleteAlerte function
    it('should set changeTab function', function() {
        createController();
        dump("[myAccountsCtrlTest] Test set of changeTab function");
        expect(scope.changeTab).toBeDefined();
    });
   

});