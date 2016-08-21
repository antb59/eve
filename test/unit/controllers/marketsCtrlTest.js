//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('marketsCtrl', function() {
    var controllerFactory, scope;

    function createController() {
        return controllerFactory('marketsCtrl', {
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
    it('should have variable currentTab = "marketsCard"', function(){
        createController();
        dump("[marketsCtrlTest] Test variable currentTab value");
        expect(scope.currentTab).toBe('marketsCard');
    });
        
    // Test variable currentMarketTab value"
    it('should have variable currentMarketTab = "Actions"', function(){
        createController();
        dump("[marketsCtrlTest] Test variable currentMarketTab value");
        expect(scope.currentMarketTab).toBe('Actions');
    });
       
    // Test variable currentRankTab value
    it('should have variable currentRankTab = "best"', function(){
        createController();
        dump("[marketsCtrlTest] Test variable currentRankTab value");
        expect(scope.currentRankTab).toBe('best');
    });
    
    
    // Test set of checkOrientation function - IT DOESN'T WORK
    xit('should set checkOrientation function', function() {
    createController();
        createController();
        dump("[marketsCtrl] Test set of checkOrientation function");
        expect(checkOrientation).toBeDefined();
    });

    // Test set of orientationChangeListener function - IT DOESN'T WORK
    xit('should set orientationChangeListener function', function() {
        createController();
        dump("[marketsCtrl] Test set of orientationChangeListener function");
        expect(orientationChangeListener).toBeDefined();
    });
    
    // Test set of isPortrait function
    it('should set isPortrait function', function() {
        createController();
        dump("[marketsCtrlTest] Test set of isPortrait function");
        expect(scope.isPortrait).toBeDefined();
    });
    
    // Test set of isLandscape function
    it('should set isLandscape function', function() {
        createController();
        dump("[marketsCtrlTest] Test set of isLandscape function");
        expect(scope.isLandscape).toBeDefined();
    });
    
    // Test set of changeTab function
    it('should set changeTab function', function() {
        createController();
        dump("[marketsCtrlTest] Test set of changeTab function");
        expect(scope.changeTab).toBeDefined();
    });
    
    // Test set of changeRankTab function
    it('should set changeRankTab function', function() {
        createController();
        dump("[marketsCtrlTest] Test set of changeRankTab function");
        expect(scope.changeRankTab).toBeDefined();
    });
    
    // Test set of changeMarketTab function
    it('should set changeMarketTab function', function() {
        createController();
        dump("[marketsCtrlTest] Test set of changeMarketTab function");
        expect(scope.changeMarketTab).toBeDefined();
    });
});