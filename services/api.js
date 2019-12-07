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

        getPlaylists: function(username) {
          var limit = 50;
          var ret = $q.defer();
          var playlists = [];

          $http.get(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists', {
            params: {
              limit: limit
            },
            headers: {
              'Authorization': 'Bearer ' + Auth.getAccessToken()
            }
          }).success(function(r) {
            playlists = playlists.concat(r.items);

            var promises = [],
                total = r.total,
                offset = r.offset;

            while (total > limit + offset) {
              promises.push(
                $http.get(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists', {
                  params: {
                    limit: limit,
                    offset: offset + limit
                  },
                  headers: {
                    'Authorization': 'Bearer ' + Auth.getAccessToken()
                  }
                })
              );
              offset += limit;
            };

            $q.all(promises).then(function(results) {
              results.forEach(function(result) {
                playlists = playlists.concat(result.data.items);
              })
              console.log('got playlists', playlists);
              ret.resolve(playlists);
            });

          }).error(function(data, status, headers, config) {
            ret.reject(status);
          });
          return ret.promise;
        },
        getPlaylist: function(username, playlist) {
  				var ret = $q.defer();
  				$http.get(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists/' + encodeURIComponent(playlist), {
  					headers: {
  						'Authorization': 'Bearer ' + Auth.getAccessToken()
  					}
  				}).success(function(r) {
  					console.log('got playlists', r);
  					ret.resolve(r);
  				});
  				return ret.promise;
  			},

  			getPlaylistTracks: function(username, playlist) {
  				var ret = $q.defer();
  				$http.get(baseUrl + '/users/' + encodeURIComponent(username) + '/playlists/' + encodeURIComponent(playlist) + '/tracks', {
  					headers: {
  						'Authorization': 'Bearer ' + Auth.getAccessToken()
  					}
  				}).success(function(r) {
  					console.log('got playlist tracks', r);
  					ret.resolve(r);
  				});
          console.log('failed to get tracks');
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
