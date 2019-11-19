(function() {

    var module = angular.module('spoti');

    module.factory('API', function(Auth, $q, $http) {

      var baseUrl = 'https://api.spotify.com/v1';

      return {
        getMe: function() {
  				var ret = $q.defer();
  				$http.get(baseUrl + '/me', {
  					headers: {
  						'Authorization': 'Bearer ' + Auth.getAccessToken()
  					}
  				}).success(function(r) {
  					console.log('success, userinfo got', r);
  					ret.resolve(r);
  				}).error(function(err) {
  					console.log('failed to get userinfo', err);
  					ret.reject(err);
  				});
  				return ret.promise;
  			},
        getMyUsername: function() {
  				var ret = $q.defer();
  				$http.get(baseUrl + '/me', {
  					headers: {
  						'Authorization': 'Bearer ' + Auth.getAccessToken()
  					}
  				}).success(function(r) {
  					console.log('got userinfo', r);
  					ret.resolve(r.id);
  					// ret.resolve('test_1');
  				}).error(function(err) {
  					console.log('failed to get userinfo', err);
  					ret.reject(err);
  					//
  					// ret.resolve('test_1');
  				});
  				return ret.promise;
  			},

        getSearchResults: function(query) {
          var ret = $q.defer();
          $http.get(baseUrl + '/search?type=track,playlist&q=' + encodeURIComponent(query) + '&market=from_token', {
            headers: {
              'Authorization': 'Bearer ' + Auth.getAccessToken()
            }
          }).success(function(r) {
            console.log('got search results', r);
            ret.resolve(r);
          });
            return ret.promise;
        },

        getUser: function(username) {
          var ret = $q.defer();
          $http.get(baseUrl + '/users/' +
            encodeURIComponent(username),
          {
            headers: {
              'Authorization': 'Bearer ' + Auth.getAccessToken()
            }
          }).success(function(r) {
            console.log('got userinfo', r);
            ret.resolve(r);
          }).error(function(err) {
            console.log('failed to get userinfo', err);
            ret.reject(err);
          });
          return ret.promise;
        },
      };
    });
})();
