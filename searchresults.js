(function() {

  var module = angular.module('spoti');

  module.controller('SearchResultsController', function($scope, API, $location, $routeParams) {
    $scope.query = $location.search().q || '';
    $scope.tracks = [];

    API.getSearchResults($scope.query).then(function(results) {
      console.log('got search results', results);
      $scope.tracks = results.tracks.items;
      $scope.playlists = results.playlists.items;
      });
    });
})();
