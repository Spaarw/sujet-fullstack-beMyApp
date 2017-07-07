/**
 * @author Pierre Petit
 * @description CONFERENCES ROUTER
 * @date 26/06/2017
 */

"use strict";

var moment = require('moment');

var Response = require(PATH_MODULES + "/response/response");
var Sockets = require(PATH_MODULES + "/sockets/sockets");

var Conferences = require(PATH_DB_MANAGERS + "/conferences/manager");

module.exports = function (server, io) {
	var socket = new Sockets(io);


	/**
	 * GET ROUTES CONFERENCES
	 * Used to get all conferences
	 * @param search
	 */
	server.get('/routes/conferences', function (req, res) {
		Conferences.find({archived: false}, {
			description:1,
			title: 1,
			dateStart: 1,
			logo:1
		}).sort({dateStart:-1}).exec(function (err, conferences) {
			if (err) {
				Response.send(res, HTTP_INTERNAL_ERROR, 'An unknown error has been detected !', err);
			}
			else {
				Response.send(res, HTTP_SUCCESS, conferences);
			}
		});
	});


	/**
	 * GET ROUTES CONFERENCES :CONFERENCEID
	 * Used to get conference detail by id
	 */
	server.get('/routes/conferences/:conferenceId', function (req, res) {
		Conferences.findOne({_id: req.params.conferenceId, archived: false}, function (err, conference) {
			if (err) {
				Response.send(res, HTTP_INTERNAL_ERROR, 'An unknown error has been detected !', err);
			}
			else if (conference) {
				Response.send(res, HTTP_SUCCESS, conference);
			}
			else {
				Response.send(res, HTTP_FAILED, 'This conference does not exists');
			}
		});
	});


	/**
	 * PUT ROUTES CONFERENCES
	 * Used to create a new conference
	 * @param dateStart
	 * @param title
	 * @param description
	 */
	server.put('/routes/conferences', function (req, res) {
		if (req.body.dateStart && req.body.title && req.body.description) {
			if (moment(req.body.dateStart).isValid()) {
				var conference = new Conferences();
				conference.dateStart = req.body.dateStart;
				conference.title = req.body.title;
				conference.description = req.body.description;
				conference.save(function (err) {
					if (err) {
						Response.send(res, HTTP_INTERNAL_ERROR, 'An unknown error has been detected !', err);
					}
					else {
						Response.send(res, HTTP_SUCCESS, conference);
					}
				});
			}
			else {
				Response.send(res, HTTP_FAILED, 'Sorry, the date format [' + req.body.dateStart + '] is not valid');
			}
		}
		else {
			Response.send(res, HTTP_FAILED, 'To create a conferences, theses fields are required [dateStart, title, description]');
		}
	});


	/**
	 * POST ROUTES CONFERENCES :CONFERENCEID
	 * Used to update conference information
	 * @param dateStart
	 * @param title
	 * @param description
	 */
	server.post('/routes/conferences/:conferenceId', function (req, res) {
		if (req.body.dateStart && req.body.title && req.body.description) {
			if (moment(req.body.dateStart).isValid()) {
				Conferences.findOne({_id: req.params.conferenceId, archived: false}, function (err, conference) {
					if (err) {
						Response.send(res, HTTP_INTERNAL_ERROR, 'An unknown error has been detected !', err);
					}
					else if (conference) {
						conference.dateStart = req.body.dateStart;
						conference.title = req.body.title;
						conference.description = req.body.description;
						conference.save(function (err) {
							if (err) {
								Response.send(res, HTTP_INTERNAL_ERROR, 'An unknown error has been detected !', err);
							}
							else {
								Response.send(res, HTTP_SUCCESS, conference);
							}
						});
					}
					else {
						Response.send(res, HTTP_FAILED, 'This conference does not exists');
					}
				});
			}
			else {
				Response.send(res, HTTP_FAILED, 'Sorry, the date format [' + req.body.dateStart + '] is not valid');
			}
		}
		else {
			Response.send(res, HTTP_FAILED, 'To update conferences, theses fields are required [dateStart, title, description]');
		}
	});


	/**
	 * POST ROUTES CONFERENCES :CONFERENCEID LOGO
	 * Used to update conference logo
	 */
	server.post('/routes/conferences/:conferenceId/logo', function (req, res) {
		Conferences.findOne({_id: req.params.conferenceId, archived: false}, function (err, conference) {
			if (err) {
				Response.send(res, HTTP_INTERNAL_ERROR, 'An unknown error has been detected !', err);
			}
			else if (conference) {
				Conferences.uploader(req, res, function(err) {
					if (err) {
						Response.send(res, HTTP_INTERNAL_ERROR, 'An unknown error has been detected !', err);
					}
					else if (req.file) {
						conference.logo = req.file.filename;
						conference.save(function(err) {
							if (err) {
								Response.send(res, HTTP_INTERNAL_ERROR, 'An unknown error has been detected !', err);
							}
							else {
								Response.send(res, HTTP_SUCCESS, null);
							}
						});
					}
				});
			}
			else {
				Response.send(res, HTTP_FAILED, 'This conference does not exists');
			}
		});
	});


	/**
	 * DELETE ROUTES CONFERENCES :CONFERENCEID
	 * Used to delete a conference by id
	 */
	server.delete('/routes/conferences/:conferenceId', function (req, res) {
		Conferences.findOne({_id: req.params.conferenceId, archived: false}, function (err, conference) {
			if (err) {
				Response.send(res, HTTP_INTERNAL_ERROR, 'An unknown error has been detected !', err);
			}
			else if (conference) {
				socket.askConfirmation(Object.get(req, 'headers.sid'), 'Êtes-vous sûr de vouloir supprimer cette conférence ?', function(err, confirm) {
					if (err) {
						Response.send(res, HTTP_INTERNAL_ERROR, 'An unknown error has been detected !', err);
					}
					else if (confirm) {
						conference.archived = true;
						conference.save(function(err) {
							if (err) {
								Response.send(res, HTTP_INTERNAL_ERROR, 'An unknown error has been detected !', err);
							}
							else {
								Response.send(res, HTTP_SUCCESS, null);
							}
						})
					}
					else {
						Response.send(res, HTTP_CANCELED, null);
					}
				});
			}
			else {
				Response.send(res, HTTP_FAILED, 'This conference does not exists');
			}
		});
	});

};