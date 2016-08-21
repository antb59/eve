//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('NewsListCtrl', function() {
    var controllerFactory, scope, newsService;

    function createController() {
        return controllerFactory('NewsListCtrl', {
            $scope: scope,
            NewsService: newsService
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
        newsService = buildNewsServiceMock($q);
    }));

    // Test variable news not null
    it('should have variable news not null', function(){
        createController();
        dump("[newsListCtrlTest] Test variable news value not null");
        expect(scope.news).not.toBe('null');
    });
    
    // Test variable trend not null
    it('should have variable trend not null', function(){
        createController();
        dump("[newsListCtrlTest] Test variable trend value not null");
        expect(scope.trend).not.toBe('null');
    });
});