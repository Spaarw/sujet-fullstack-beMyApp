/**
 * @author Pierre Petit
 * @description HOME CONTROLLER
 * @date 27/06/2017
 * @copyright Rezocean
 */

"use strict";

app.controller('homeController', function($rootScope, $scope, restService) {


	/**
	 * REFRESH CONFERENCES
	 * Used to refresh all conferences
	 */
	$scope.refreshConferences = function() {
		$scope.conferences = null;
		restService.get.conferences().then(function (response) {
			$scope.conferences = response;
			$scope.conferences = [
				{title: 'Conférence Paris 12', description: 'RDV à paris 12 le 26 Mai 2019 !!', logo: ''},
				{title: 'Conférence Paris 13', description: 'RDV à paris 13 le 29 Mai 2019 !!', logo: ''},
				{title: 'Conférence Paris 13', description: 'RDV à paris 13 le 28 Mai 2019 !!', logo: ''}
			];
		});
	};

	$scope.refreshConferences();

});