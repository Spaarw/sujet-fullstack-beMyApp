/**
 * @author      Pierre Petit
 * @description HTTP RESPONSE MODULE
 * @date        26/06/2017
 */

"use strict";

var Logs = require(PATH_DB_MANAGERS + '/logs/manager');

module.exports = {

	/**
	 * SEND RESPONSE TO CLIENT AND UPDATE LOG INFO
	 * @param res
	 * @param httpStatus
	 * @param data
	 * @param error
	 */
	send: function (res, httpStatus, data, error) {
		var response = {
			error: httpStatus > HTTP_SUCCESS,
			motif: httpStatus > HTTP_SUCCESS ? data : null,
			data: httpStatus == HTTP_SUCCESS ? data : null
		};
		if (res.currentLogId) {
			Logs.findById(res.currentLogId, function (err, log) {
				if (err) {
					res.status(HTTP_INTERNAL_ERROR).json('An unknown error has been detected !');
				}
				else if (log) {
					log.status = httpStatus;
					log.response = data;
					if (error) {
						log.error = {
							name: error.name,
							message: error.message,
							stack: error.stack,
							detail:JSON.stringify(error)
						};
					}
					log.responseTime = Date.now() - log.date;
					log.save(function (err, log) {
						if (err) {
							res.status(HTTP_INTERNAL_ERROR).json('An unknown error has been detected !');
						}
						else {
							res.status(httpStatus).json(response);
						}
					});
				}
				else {
					res.status(httpStatus).json(response);
				}
			});
			delete res.currentLogId;
		}
		else {
			res.status(httpStatus).json(response);
		}
	}

};