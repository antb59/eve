var ptor = protractor.getInstance();

// This method is used to open the left menu
exports.openLeftMenu = function(){
    var leftMenuButtonElement = by.xpath('//button[@menu-toggle="left"]');
    expect(ptor.isElementPresent(leftMenuButtonElement)).toBe(true);
    element(leftMenuButtonElement).click();
    var leftMenuElement = by.xpath('//ion-side-menu[@side="left"]');
    expect(ptor.isElementPresent(leftMenuElement)).toBe(true);
};

// This method is used to log the user
exports.login = function(userName,password){
    //Init loginElement, passwordElement and buttonElement
    var loginNameElement = by.model('user.username');
    expect(ptor.isElementPresent(loginNameElement)).toBe(true);
    var loginPasswordElement = by.model('user.password');
    expect(ptor.isElementPresent(loginPasswordElement)).toBe(true);
    var buttonLoginElement = by.css('[ng-click="login()"]');
    expect(ptor.isElementPresent(buttonLoginElement)).toBe(true);

    //fill form with wrong password
    element(loginNameElement).sendKeys(userName);
    element(loginPasswordElement).sendKeys(password);

    //click on the button "Se connecter"
    element(buttonLoginElement).click();      
};

// This method is used to select and change tab
exports.selectTab = function(tabname){
    var tabElement = by.css('[ng-click="'+tabname+'"]');
    expect(ptor.isElementPresent(tabElement)).toBe(true);
    element(tabElement).click();
};

// This method is used to select a list element and click on the first one
exports.selectFirstElementOfList = function(loopname){
    var listResult = by.repeater(loopname);
    expect(ptor.isElementPresent(listResult)).toBe(true);
    element.all(listResult).first().click();
};

// This method is used to go back by clicking on the back button
exports.goback = function(){
    var goBackButtonElement = by.xpath('//ion-nav-back-button');
    expect(ptor.isElementPresent(goBackButtonElement)).toBe(true);
    element(goBackButtonElement).click();
}