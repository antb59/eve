//http://nadeemkhedr.wordpress.com/2013/10/18/angularjs-good-unit-test-structure-for-controllers/
//http://blog.thebrownmamba.com/2014/06/unit-testing-angular-ionic-controller.html
describe('MessageCtrl', function() {
    var controllerFactory, scope, messageService;

    function createController() {
        return controllerFactory('MessageCtrl', {
            $scope: scope,
            MessageService : messageService
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
        messageService = buildMessageServiceMock($q);
    }));

    // Test set of variable selectedMessageId
    it('should have variable selectedMessageId defined', function(){
        createController();
        dump("[messageCtrlTest] Test variable selectedMessageId value");
        expect(scope.selectedMessageId).toBeDefined();
    });
    
    // Test variable selectedMessage value
    it('should have variable selectedMessage defined', function(){
        createController();
        dump("[messageCtrlTest] Test set of variable selectedMessage : ");
        expect(scope.selectedMessage).toBeDefined();
    });
});