/**
 * @author Pierre Petit
 * @description CONFERENCES ROUTER
 * @date 26/06/2017
 */

"use strict";

var Response = require(PATH_MODULES + "/response/response");
var Sockets = require(PATH_MODULES + "/sockets/sockets");

module.exports = function(server, io) {
	var socket = new Sockets(io);


	/**
	 * GET ROUTES CONFERENCES
	 * Used to get all conferences
	 * @param search
	 */
	server.get('/routes/conferences', function(req, res) {
		// TODO : GET ALL CONFERENCES WITH SEARCH
	});


	/**
	 * GET ROUTES CONFERENCES :CONFERENCEID
	 * Used to get conference detail by id
	 */
	server.get('/routes/conferences/:conferenceId', function(req, res) {
		// TODO : GET CONFERENCE DETAIL
	});


	/**
	 * POST ROUTES CONFERENCES :CONFERENCEID
	 * Used to update conference information
	 * @param dateStart
	 * @param title
	 * @param description
	 */
	server.post('/routes/conferences/:conferenceId', function(req, res) {
		// TODO : UPDATE CONFERENCES
	});


	/**
	 * POST ROUTES COFERENCES CONFERENCEID LOGO
	 * Used to update conference logo
	 */
	server.post('/routes/conferences/:conferenceId/logo', function(req, res) {
		// TODO : UPDATE CONFERENCE LOGO
	});


	/**
	 * DELETE ROUTES CONFERENCES :CONFERENCEID
	 * Used to delete a conference by id
	 */
	server.delete('/routes/conferences/:conferenceId', function(req, res) {
		// TODO : ASK CONFIRMATION
	});

};