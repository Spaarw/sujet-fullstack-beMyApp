/**
 * @author      Pierre Petit
 * @description LOGS MIDDLEWARE
 * @date        26/06/2017
 * @copyright   Rezocean
 */

"use strict";

var response = require(PATH_MODULES + '/response/response');

var Logs = require(PATH_DB_MANAGERS + '/logs/manager');

module.exports = function (req, res, next) {

	var log = new Logs();
	log.date = Date.now();
	log.url = req.url;
	log.method = req.method;
	log.getParameters(req);
	log.getUserAgentInfo(req);
	log.ipAddress = Logs.getIpAddress(req);
	log.params = log.getParameters(req);
	log.save(function (err, newLog) {
		if (err) {
			response.send(res, HTTP_INTERNAL_ERROR, null, err);
		}
		else {
			res.currentLogId = newLog._id;
			next();
		}
	});
};