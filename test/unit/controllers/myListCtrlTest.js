//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('MyListCtrl', function() {
    var controllerFactory, scope, feedService;

    function createController() {
        return controllerFactory('MyListCtrl', {
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
    
     // Test variable currentTab value
    it('should have variable currentTab = "marketsCard"', function(){
        createController();
        dump("[myListCtrlTest] Test variable currentTab value");
        expect(scope.currentTab).toBe('Actions');
    });
    
     // Test variable editMode value
    it('should have variable editMode = "marketsCard"', function(){
        createController();
        dump("[myListCtrlTest] Test variable editMode value");
        expect(scope.editMode).toBe(false);
    });

    // Test set of changeTab function
    it('should set changeTab function', function() {
        createController();
        dump("[myListCtrlTest] Test set of changeTab function");
        expect(scope.changeTab).toBeDefined();
    });

    // Test set of changeEditMode function
    it('should set changeEditMode function', function() {
        createController();
        dump("[myListCtrlTest] Test set of changeEditMode function");
        expect(scope.changeEditMode).toBeDefined();
    });
    
    // Test set of removeAction function
    it('should set removeAction function', function() {
        createController();
        dump("[myListCtrlTest] Test set of removeAction function");
        expect(scope.removeAction).toBeDefined();
    });
    
    // Test set of addAction function
    it('should set addAction function', function() {
        createController();
        dump("[myListCtrlTest] Test set of addAction function");
        expect(scope.addAction).toBeDefined();
    });
    
    // Test set of openSelectValue function
    it('should set openSelectValue function', function() {
        createController();
        dump("[myListCtrlTest] Test set of openSelectValue function");
        expect(scope.openSelectValue).toBeDefined();
    });
    
    // Test set of closeSelectValue function
    it('should set closeSelectValue function', function() {
        createController();
        dump("[myListCtrlTest] Test set of closeSelectValue function");
        expect(scope.closeSelectValue).toBeDefined();
    });
    
});