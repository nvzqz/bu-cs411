(function() {

  var module = angular.module('spoti');

  module.factory('Auth', function() {
    // var CLIENT_ID = '';
    // var REDIRECT_URI = '';

    CLIENT_ID =	'10bdf8e085b849cd8bf1c9a9e6263be7';
    REDIRECT_URI = 'http://localhost:8888/callback.html';

    function getLoginURL(scopes) {
      return 'https://accounts.spotify.com/authorize?client_id='+CLIENT_ID
      + '&redirect_uri=' + encodeURIComponent(REDIRECT_URI)
      + '&scope=' + encodeURIComponent(scopes.join(' '))
      + '&response_type=token' ;
    }

    return {
      openLogin: function() {
        var url = getLoginURL(['user-read-private','playlist-read-private',
        'playlist-modify-public','user-library-read','user-library-modify']);

        var width = 450, height = 730, left=(screen.width/2)-(width/2), top = (screen.height / 2) - (height / 2);

        var w = window.open(url,'Spotify',width=' + width + ', height=' + height + ', top=' + top + ', left=' + left');
      },
      getAccessToken: function() {
        var expires = 0+localStorage.getItem('pa_expires', '0');
        if ((new Date()).getTime()>expires) {
          return '';
        }
        var token = localStorage.getItem('pa_token','');
        return token;
      },
      setAccessToken: function(token, expires_in) {
        localStorage.setItem('pa_token', token);
        localStorage.setItem('pa_expires', (new Date()).getTime() + expires_in);
        // _token = token;
        // _expires = expires_in;
      },
      getUsername: function() {
        var username = localStorage.getItem('pa_username', '');
        console.log(username);
        return username;
      },
      setUsername: function(username) {
        localStorage.setItem('pa_username', username);
      },
      getUserCountry: function() {
        var userCountry = localStorage.getItem('pa_usercountry', 'US');
        return userCountry;
      },
      setUserCountry: function(userCountry) {
        localStorage.setItem('pa_usercountry', userCountry);
      }
    }
  });

})();
