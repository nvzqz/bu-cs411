(function() {

	var module = angular.module('spoti');

	module.controller('MainController', function($scope, $rootScope, Auth, API, $location) {
		$scope.view = 'welcome';
		$scope.profileUsername = Auth.getUsername();

		$scope.logout = function() {
			// do login!
			console.log('do logout...');
			Auth.setUsername('');
			Auth.setAccessToken('', 0);
			$scope.$emit('logout');
		};

		$scope.showhome = function() {
			console.log('load home view');
		};
		$scope.query = '';

		$scope.loadsearch = function() {
			console.log('search for', $scope.query);
			$location.path('/search').search({ q: $scope.query }).replace();
		};

		$rootScope.$on('login', function() {
			$scope.profileUsername = Auth.getUsername();
			// updatePlaylists();
		});
	});

})();
