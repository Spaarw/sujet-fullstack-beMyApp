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
	 */
	service.get.conferences = function() {
		return $http.get('/routes/conferences').then(function(response) {
			return response.data;
		}, handleHttpError);
	};


	/**
	 * GET CONFERENCES DETAIL
	 * Used to get a conference dedail by id
	 */
	service.get.conferencesDetail = function(conferenceId) {
		return $http.get('/routes/conferences/' + conferenceId).then(function(response) {
			return response.data;
		}, handleHttpError);
	};

	return service;
});