(function() {

	var module = angular.module('spoti');

	module.controller('LoginController', function($scope, Auth) {
		$scope.isLoggedIn = false;

		$scope.login = function() {
			// do login!
			console.log('logging in...');

			Auth.openLogin();
		}
	});

})();
