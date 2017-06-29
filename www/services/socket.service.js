/**
 * @author Pierre Petit
 * @description SOCKET SERVICE
 * @date 27/06/2017
 * @copyright Rezocean
 */

"use strict";

app.service('socketService', function($rootScope, $http, $uibModal) {

	var socket = io.connect();

	/**
	 * ON CONNECTION : GET SOCKET ID
	 */
	socket.on('connection:sid', function (sid) {
		$http.defaults.headers.common['sid'] = sid;
		console.log('SocketId = ', sid);
	});


	socket.on('ask:confirmation:request', function(data) {
		var modalInstance = $uibModal.open({
			templateUrl: '/services/modal.socket.askConfirmation.html',
			controller: function ($scope) {
				$scope.data = data;
				$scope.sendResponse = function (response) {
					modalInstance.close(response);
				};
			}
		});
		modalInstance.result.then(function (response) {
			// On modal close
			socket.emit(data.destination, response);
		}, function () {
			// On modal dismiss
			socket.emit(data.destination, false);
		});
	});

	return socket;

});