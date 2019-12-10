(function() {

    var module = angular.module('spoti');
    // Token needed
    var token = "token needed from signing Apple private key"

    module.factory('APPLE_API', function($q, $http) {

      var baseUrl = 'https://api.music.apple.com/v1';

      return {
        // listName: The name for the newly created playlist
        createPlaylist: function(listName) {
  				var ret = $q.defer();
  				$http.post(baseUrl + '/me/library/playlists', {
            body: {
              'attributes': {
                'name': listName,
                'description': ''
             }
            },
  					headers: {
  						'Authorization': 'Bearer ' + token
  					}
  				}).success(function(r) {
  					console.log('New playlist created', r);
  					ret.resolve(r);
  				}).error(function(err) {
  					console.log('Failed to create playlist', err);
  					ret.reject(err);
  				});
  				return ret.promise;
        },
        
        // one ID needed in url and one ID needed in the http body
        addTrack: function(urlId, trackId) {
  				var ret = $q.defer();
          // id needed for songs to be added
  				$http.post(baseUrl + '/me/library/playlists/' + urlId + '/tracks', {
            body: {
              'data':[
                {
                   'id': trackId,
                   'type': 'songs'
                }
              ]
            },
  					headers: {
              'Authorization': 'Bearer ' + token
  					}
  				}).success(function(r) {
  					console.log('New track added', r);
            ret.resolve(r);
            
  				}).error(function(err) {
  					console.log('Failed to add track', err);
  					ret.reject(err);
  				});
  				return ret.promise; 
        },

        findTrack: function(query){
          var ret = $q.defer();
          // term: key word for searching
          // limit: number of object(s) returned from search
          // types: songs/artists/albums/...
          $http.get(baseUrl + '/catalog/us/search?term=' + encodeURIComponent(query) + '&limit=1&types=songs', {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }).success(function(r) {
            console.log('Track found', r);
            ret.resolve(r);
          }).error(function(err) {
            console.log('Failed to find track', err);
            ret.reject(err);
          });
          return ret.promise;
        }
      };
    });
})();
