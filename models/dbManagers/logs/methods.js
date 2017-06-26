/**
 * @author      Pierre Petit
 * @description LOGS DATABASE METHODS
 * @date        26/06/2017
 */

"use strict";


module.exports = function (manager) {

	/**
	 * GET CLIENT REQUEST PARAMETERS
	 * @param request
	 * @returns {*}
	 */
	manager.methods.getParameters = function (request) {
		if (request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE') {
			this.params = request.body;
		}
		else if (request.method == 'GET') {
			this.params = request.query || request.body;
		}
	};

	/**
	 * GET CLIENT IP ADDRESS
	 * @param request
	 * @returns {*}
	 */
	manager.statics.getIpAddress = function (request) {
		return Object.get(request, 'headers.x-forwarded-for') || Object.get(request, 'connection.remoteAddress') || Object.get(request, 'socket.remoteAddress') || Object.get(request, 'connection.socket.remoteAddress');
	};
};