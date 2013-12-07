angular.module('eveApp').controller('bookmarksCtrl', function bookmarksCtrl($scope, $http, $templateCache) {

        /*$scope.bookmarks = [{
        label: 'Angular.js samples',
        link: 'http://angularjs.org/',
        tags: ['angular.js']
    }, {
        label: 'HTML5 / Angular.js live update',
        link: 'http://www.google.com',
        tags: ['angular.js','html5']
    }];*/

    $scope.selectedTags = {tags : []};
    $scope.bookmarksFolderDisplay = false;
    $scope.bookmarksEdition = false;

    $scope.loadBookmarks = function() {
        console.log('Getting Bookmarks');

        $http.get('/api/getBookmarks').success(function(response) {
            $scope.bookmarks = response.bookmarks;
        }).
        error(function(response) {
            $scope.bookmarks = response.status + ' - ' + response.message;
        });
    }

    $scope.loadBookmarksByTag = function() {
        console.log("Getting Bookmarks for tags '" + $scope.selectedTags.tags + "'");

        console.log("SelectedTags : " + jQuery.param($scope.selectedTags, true));

        var urlToLoadBookmarks = '/api/getBookmarks';
        if ($scope.selectedTags.tags.length > 0)
            urlToLoadBookmarks += '?' + jQuery.param($scope.selectedTags, true);   

        $http.get(urlToLoadBookmarks).success(function(response) {
            $scope.bookmarks = response.bookmarks;
        }).
        error(function(response) {
            $scope.bookmarks = response.status + ' - ' + response.message;
        });
    }

    $scope.selectTag = function(tag) {
        console.log("Selecting Tag '" + tag + "'");
        $scope.selectedTags.tags.push(tag);
        $scope.loadBookmarksByTag();
    }
    
    $scope.removeSelectedTag = function(tag) {
        console.log("Removing Tag '" + tag + "'");
        $scope.selectedTags.tags.pop(tag);
        $scope.loadBookmarksByTag();
    }

    $scope.editBookmarks = function() {
        console.log("Editing bookmark '" + !$scope.bookmarksEdition + "'");
        $scope.bookmarksEdition = !$scope.bookmarksEdition;
    }
    
    $scope.switchBookmarkDisplay = function() {
        console.log("Switching bookmark display '" + !$scope.bookmarksFolderDisplay + "'");
        $scope.bookmarksFolderDisplay = !$scope.bookmarksFolderDisplay;
    }

    $scope.addBookmark = function() {
        console.log('Adding Bookmark');

        var tagsArray = this.bookmarkTagsText.split(" ");

        var bookmarkFormData = {
            bookmark: {
                label: this.bookmarkLabelText,
                url: this.bookmarkLinkText,
                tags: tagsArray
            }
        };

        $http.post('/api/addBookmark', bookmarkFormData).success(function(response) {
            console.log("Bookmark successfully added : " + response.bookmark);
            $scope.bookmarkLabelText = "";
            $scope.bookmarkLinkText = "";
            $scope.bookmarkTagsText = "";
            $scope.loadBookmarksByTag();
        }).
        error(function(response) {
            console.log("Error while adding bookmark : " + response)
        });
    };
    
    $scope.deleteBookmark = function(pBookmark) {
        console.log("Deleting Bookmark '" + pBookmark._id + "'");

        var bookmarkData = {
            bookmark: {
                _id: pBookmark._id
            }
        };

        $http.post('/api/deleteBookmark', bookmarkData).success(function(response) {
            console.log("Bookmark successfully deleted : " + response.bookmark);
            $scope.loadBookmarks();
        }).
        error(function(response) {
            console.log("Error while adding bookmark : " + response)
        });
    };

    $scope.loadBookmarksByTag();

});