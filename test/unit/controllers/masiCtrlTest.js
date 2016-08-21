//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('MasiCtrl', function() {
    var controllerFactory, scope, feedService;

    function createController() {
        return controllerFactory('MasiCtrl', {
            $scope: scope,
            FeedService: feedService
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
        feedService = buildFeedServiceMock($q);
    }));

    // Test variable masi value
    it('should have variable masi not null', function(){
        createController();
        dump("[masiCtrlTest] Test variable masi not null");
        expect(scope.masi).not.toBe(null);
    });
    
    // Test set of drawIntradayGraph function
    it('should set drawIntradayGraph function', function() {
        createController();
        dump("[masiCtrlTest] Test set of drawIntradayGraph function");
        expect(scope.drawIntradayGraph).toBeDefined();
    });

    // Test set of drawHistoGraph function
    it('should set drawHistoGraph function', function() {
        createController();
        dump("[masiCtrlTest] Test set of drawHistoGraph function");
        expect(scope.drawHistoGraph).toBeDefined();
    });
    
    // Test set of changePeriod function
    it('should set changePeriod function', function() {
        createController();
        dump("[masiCtrlTest] Test set of changePeriod function");
        expect(scope.changePeriod).toBeDefined();
    });
    
    // Test set of isHisto function
    it('should set isHisto function', function() {
        createController();
        dump("[masiCtrlTest] Test set of isHisto function");
        expect(scope.isHisto).toBeDefined();
    });
    
    // Test set of drawHistoIntradayGraph function
    it('should set drawHistoIntradayGraph function', function() {
        createController();
        dump("[masiCtrlTest] Test set of drawHistoIntradayGraph function");
        expect(scope.drawHistoIntradayGraph).toBeDefined();
    });
});