/**
 * @author      Pierre Petit
 * @description SOCKETS MODULE
 * @date        26/06/2017
 */

"use strict";

module.exports = function (io) {

	var self = this;


	/**
	 * GET SOCKET BY ID
	 * Used to get a connected socket by sid
	 * @param sid
	 * @returns {*}
	 */
	this.getSocketById = function (sid) {
		return io.sockets.connected[sid];
	};


	/**
	 * ALERT SIDS
	 * Used to alert sids
	 * @param sids
	 * @param type
	 * @param message
	 */
	this.alertSids = function (sids, type, message) {
		var _source = 'alert:' + (type || 'info');
		if (sids) {
			!Array.isArray(sids) ? sids = [sids] : '';
			for (var i = 0; i < sids.length; i++) {
				var _socket = this.getSocketById(sids[i]);
				if (_socket) {
					_socket.emit(_source, message);
				}
			}
		}
	};


	/**
	 * ASK CONFIRMATION
	 * Used to ask a confirmation to one sid
	 * @param sid
	 * @param message
	 * @param callback
	 */
	this.askConfirmation = function (sid, message, callback) {
		if (sid) {
			var _source = 'ask:confirmation:request';
			var _destination = 'ask:confirmation:response';
			var _socket = this.getSocketById(sid);
			if (_socket) {
				_socket.emit(_source, {
					message: message,
					destination: _destination
				});
				_socket.on(_destination, function (response) {
					_socket.removeAllListeners(_destination);
					callback(null, response);
				});
			}
			else {
				callback(new Error('Socket not found.'), null);
			}
		}
		else {
			callback(new Error('Sid not found'), null);
		}
	};

};