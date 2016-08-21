//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('MyAlertsCtrl', function() {
    var controllerFactory, scope, alertService, feedService;

    function createController() {
        return controllerFactory('MyAlertsCtrl', {
            $scope: scope,
            AlertService: alertService,
            FeedService : feedService
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
        alertService = buildAlertServiceMock($q);
        feedService = buildFeedServiceMock($q);
    }));

    // Test set of changeTab function
    it('should set changeTab function', function() {
        createController();
        dump("[myAlertsCtrlTest] Test set of changeTab function");
        expect(scope.changeTab).toBeDefined();
    });

    // Test set of changeMyAlertsTab function
    it('should set changeMyAlertsTab function', function() {
        createController();
        dump("[myAlertsCtrlTest] Test set of changeMyAlertsTab function");
        expect(scope.changeMyAlertsTab).toBeDefined();
    });
    
    // Test set of openSelectValue function
    it('should set openSelectValue function', function() {
        createController();
        dump("[myAlertsCtrlTest] Test set of openSelectValue function");
        expect(scope.openSelectValue).toBeDefined();
    });
    
    // Test set of closeSelectValue function
    it('should set closeSelectValue function', function() {
        createController();
        dump("[myAlertsCtrlTest] Test set of closeSelectValue function");
        expect(scope.closeSelectValue).toBeDefined();
    });
    
     // Test set of addAction function
    it('should set addAction function', function() {
        createController();
        dump("[myAlertsCtrlTest] Test set of addAction function");
        expect(scope.addAction).toBeDefined();
    });
    
     // Test set of createAction function
    it('should set createAction function', function() {
        createController();
        dump("[myAlertsCtrlTest] Test set of createAction function");
        expect(scope.createAction).toBeDefined();
    });
    
     // Test set of cancelAction function
    it('should set cancelAction function', function() {
        createController();
        dump("[myAlertsCtrlTest] Test set of cancelAction function");
        expect(scope.cancelAction).toBeDefined();
    });
});