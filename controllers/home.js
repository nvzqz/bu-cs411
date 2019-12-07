(function() {

	var module = angular.module('spoti');

	module.controller('HomeController', function($scope, $routeParams) {
		$scope.id = $routeParams.id;
	});

})();
