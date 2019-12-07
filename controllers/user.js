(function() {

	var module = angular.module('spoti');

	module.controller('UserController', function($scope, $routeParams, API) {
		$scope.profileUsername = $routeParams.username;
		$scope.data = null;
		$scope.playlistError = null;

		API.getUser($scope.profileUsername).then(function(user) {
			console.log('got user', user);
			$scope.data = user;
		});

		API.getPlaylists($scope.profileUsername).then(function(userplaylists){
			console.log('got user playlists', userplaylists);
			$scope.userplaylists = userplaylists;
		}, function(reason){
			console.log("got error", reason);
			$scope.playlistError = true;
		});
	});

})();
