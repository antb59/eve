//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('ValueDetailsCtrl', function() {
    var controllerFactory, scope, accountService, feedService, selectedValue, stateParams;

    function createController() {
        return controllerFactory('ValueDetailsCtrl', {
            $scope: scope,
            AccountService: accountService,
            FeedService: feedService,
            $stateParams : stateParams
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
        feedService = buildFeedServiceMock($q);
        stateParams = { valueIsin : 'MA0000011926'};

    }));

    // Test set of changeTab function
    it('should set changeTab function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of changeTab function");
        expect(scope.changeTab).toBeDefined();
    });

    // Test set of showActions function
    it('should set showActions function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of showActions function");
        expect(scope.showActions).toBeDefined();
    });
    
    // Test set of trade function
    xit('should set trade function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of trade function");
        expect(scope.trade).toBeDefined();
    });
    
    // Test set of closeTradeModal function
    it('should set closeTradeModal function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of closeTradeModal function");
        expect(scope.closeTradeModal).toBeDefined();
    });
    
    // Test set of tradeConfirmed function
    it('should set tradeConfirmed function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of tradeConfirmed function");
        expect(scope.tradeConfirmed).toBeDefined();
    });

    // Test set of drawIntradayGraph function
    it('should set drawIntradayGraph function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of drawIntradayGraph function");
        expect(scope.drawIntradayGraph).toBeDefined();
    });
    
    // Test set of isPortrait function
    it('should set isPortrait function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of isPortrait function");
        expect(scope.isPortrait).toBeDefined();
    });
    
    // Test set of isLandscape function
    it('should set isLandscape function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of isLandscape function");
        expect(scope.isLandscape).toBeDefined();
    });
    
    // Test set of drawHistoGraph function
    it('should set drawHistoGraph function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of drawHistoGraph function");
        expect(scope.drawHistoGraph).toBeDefined();
    });
    
    // Test set of changePeriod function
    xit('should set changePeriod function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of changePeriod function");
        expect(scope.changePeriod).toBeDefined();
    });

    // Test set of isHisto function
    it('should set isHisto function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of isHisto function");
        expect(scope.isHisto).toBeDefined();
    });
    
    // Test set of drawHistoIntradayGraph function
    it('should set drawHistoIntradayGraph function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of drawHistoIntradayGraph function");
        expect(scope.drawHistoIntradayGraph).toBeDefined();
    });
    
    // Test set of drawHistoYearGraph function
    it('should set drawHistoYearGraph function', function() {
        createController();
        dump("[valueDetailsCtrlTest] Test set of drawHistoYearGraph function");
        expect(scope.drawHistoYearGraph).toBeDefined();
    });
    
});