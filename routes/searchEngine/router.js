/**
 * @author Pierre Petit
 * @description SEARCH ENGINE ROUTER
 * @date 26/06/2017
 */

"use strict";

var Sockets = require(PATH_MODULES + '/sockets/sockets');
var Response = require(PATH_MODULES + '/response/response');
var SearchEngine = require(PATH_MODULES + '/searchEngine/searchEngine');

module.exports = function(server, io) {
	var socket = new Sockets(io);


	/**
	 * GET ROUTES SEARCH ENGINE
	 * Used to launch search engine
	 * @param search
	 */
	server.get('/routes/searchEngine', function(req, res) {
		if (req.query.search) {
			var searchEngine = new SearchEngine(req.body.search, req.session);
			searchEngine.search('Conferences', null, function (err, docs) {
				if (err) {
					Response.send(res, HTTP_INTERNAL_ERROR, 'An unknown error has been detected !', err);
				}
				else {
					Response.send(res, HTTP_SUCCESS, docs);
				}
			});
		}
		else {
			Response.send(res, HTTP_FAILED, 'A search input is required to continue');
		}
	});

};