function wikipediaCtrl($scope, $http, $templateCache) {

    $scope.wikipediaArticle = '';
    $scope.getWikipediaArticle = function() {
        console.log('Getting Wikipedia Article: ' + this.titleText);

        $http.get('/api/getWikipediaArticle/' + this.titleText).success(function(response) {
            $scope.wikipediaArticle = response.message;
            console.log($scope.wikipediaArticle);
        }).
        error(function(response) {
            $scope.wikipediaArticle = response.status + ' - ' + response.message;
            console.log($scope.wikipediaArticle);
        });
    };

}