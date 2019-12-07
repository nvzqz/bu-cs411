(function() {

	var module = angular.module('spoti');

	module.controller('PlaylistController', function($scope, $rootScope, API, $routeParams, Auth, $sce) {
		$scope.playlist = $routeParams.playlist;
		$scope.username = $routeParams.username;
		$scope.name = '';
		$scope.tracks = [];
		$scope.data = null;
		$scope.total_duration = 0;

		API.getPlaylist($scope.username, $scope.playlist).then(function(list) {
			console.log('got playlist', list);
			$scope.name = list.name;
			$scope.data = list;
			$scope.playlistDescription = $sce.trustAsHtml(list.description);
		});

		API.getPlaylistTracks($scope.username, $scope.playlist).then(function(list) {
			console.log('got playlist tracks', list);
			var tot = 0;
			list.items.forEach(function(track) {
				tot += track.track.duration_ms;
			});
			$scope.tracks = list.items;
			console.log('tot', tot);
			$scope.total_duration = tot;
		});

		$scope.ev_click = function(obj){
		    var ev = document.createEvent("MouseEvents");
		    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		    obj.dispatchEvent(ev);
		}

		$scope.exportPlaylist = function(name){
				var data = $scope.tracks.map(function(track) {
						return [track.track.uri, track.track.name, track.track.artists[0].name, track.track.album.name]+'\n';
				});
		    var urlObject = window.URL || window.webkitURL || window;
		    var export_blob = new Blob([data], {type: "Multipart/form-data"});
		    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
		    save_link.href = urlObject.createObjectURL(export_blob);
		    save_link.download = name;
		    $scope.ev_click(save_link);
		}
	});

})();
