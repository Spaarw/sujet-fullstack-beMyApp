/**
 * @author Pierre Petit
 * @description REST SERVICE
 * @date 27/06/2017
 * @copyright Rezocean
 */

"use strict";

app.service('restService', function($rootScope, $http) {

	var handleHttpError = function(error) {
		console.error(error);
		return null;
	};

	var service = {get:{}, post:{}, put:{}, delete:{}};

	/**
	 * GET CONFERENCES
	 * Used to get all conferences
	 * @returns {Promise.<TResult>|Promise|*}
	 */
	service.get.conferences = function() {
		return $http.get('/routes/conferences').then(function(response) {
			return response.data;
		}, handleHttpError);
	};


	/**
	 * GET CONFERENCES DETAIL
	 * Used to get a conference dedail by id
	 * @param conferenceId
	 * @returns {Promise.<TResult>|Promise|*}
	 */
	service.get.conferencesDetail = function(conferenceId) {
		return $http.get('/routes/conferences/' + conferenceId).then(function(response) {
			return response.data;
		}, handleHttpError);
	};


	/**
	 * PUT CONFERENCES
	 * Used to create a new conference
	 * @param conference
	 * @param conference.dateStart
	 * @param conference.title
	 * @param conference.description
	 * @returns {Promise.<TResult>|Promise|*}
	 */
	service.put.conferences = function(conference) {
		return $http.put('/routes/conferences', {
			dateStart:conference.dateStart,
			title:conference.title,
			description:conference.description
		}).then(function(response) {
			return response.data;
		}, handleHttpError);
	};


	/**
	 * POST CONFERENCES
	 * Used to update a conference
	 * @param conference
	 * @param conference._id
	 * @param conference.dateStart
	 * @param conference.title
	 * @param conference.description
	 * @returns {Promise.<TResult>|Promise|*}
	 */
	service.post.conferences = function(conference) {
		return $http.post('/routes/conferences/' + conference._id, {
			dateStart:conference.dateStart,
			title:conference.title,
			description:conference.description
		}).then(function(response) {
			return response.data;
		}, handleHttpError);
	};


	/**
	 * DELETE CONFERENCES
	 * Used to delete a conference by ID
	 * @param conferenceId
	 * @returns {*|Promise|Promise.<TResult>}
	 */
	service.delete.conferences = function(conferenceId) {
		return $http.delete('/routes/conferences/' + conferenceId).then(function(response) {
			return response.data;
		}, handleHttpError);
	};

	return service;
});