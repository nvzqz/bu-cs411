(function() {

  var app = angular.module('spoti', ['ngRoute']);

  app.config(function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl:'partials/searchResult.html',
        controller: 'SearchResultController'
      }).otherwise({
        redirectTo:'/'
      });
  });

  app.controller('AppController', function($scope, Auth,API, $location) {
    console.log('AppController operating');
    console.log(location);

    function checkUser(redirectToLogin) {
      API.getMe().then(function(userInfo) {
				Auth.setUsername(userInfo.id);
				Auth.setUserCountry(userInfo.country);
				if (redirectToLogin) {
					$scope.$emit('login');
					$location.replace();
				}
			}, function(err) {
				$scope.showplayer = false;
				$scope.showlogin = true;
				$location.replace();
			});
    }

    window.addEventListener("message", function(event) {
      console.log('got postmessage', event);
      var hash = JSON.parse(event.data);
      if (hash.type == 'access_token') {
        Auth.setAccessToken(hash.access_token, hash.expires_in || 60);
        checkUser(true);
      }
      }, false);

      $scope.isLoggedIn = (Auth.getAccessToken() != '');
      $scope.showplayer = $scope.isLoggedIn;
      $scope.showlogin = !$scope.isLoggedIn;

      $scope.$on('login', function() {
        $scope.showplayer = true;
        $scope.showlogin = false;
        $location.path('/').replace().reload();
      });

      $scope.$on('logout', function() {
        $scope.showplayer = false;
        $scope.showlogin = true;
      });

      checkUser();
  });

})();
