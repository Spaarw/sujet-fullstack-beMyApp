/**
 * @author Pierre Petit
 * @description SOCKET SERVICE
 * @date 27/06/2017
 * @copyright Rezocean
 */

"use strict";

app.service('socketService', function($rootScope, $http) {

	var socket = io.connect();

	/**
	 * ON CONNECTION : GET SOCKET ID
	 */
	socket.on('connection:sid', function (sid) {
		$http.defaults.headers.common['sid'] = sid;
		console.log('SocketId = ', sid);
	});

});