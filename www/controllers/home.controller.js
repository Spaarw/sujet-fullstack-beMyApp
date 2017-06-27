/**
 * @author Pierre Petit
 * @description HOME CONTROLLER
 * @date 27/06/2017
 * @copyright Rezocean
 */

"use strict";

app.controller('homeController', function ($rootScope, $scope, $uibModal, restService) {


	/**
	 * REFRESH CONFERENCES
	 * Used to refresh all conferences
	 */
	$scope.refreshConferences = function () {
		$scope.conferences = null;
		restService.get.conferences().then(function (response) {
			$scope.conferences = response.data;
		});
	};


	/**
	 * OPEN MODAL CONFERENCE DETAIL
	 * used to open modal conference detail
	 * @param conferenceId
	 */
	$scope.openModalConferenceDetail = function (conferenceId) {
		console.log(conferenceId);
		$uibModal.open({
			templateUrl: 'templates/modal.conferenceDetail.template.html',
			controller: 'modalConferenceDetailController',
			resolve: {
				conferenceId: function () {
					return conferenceId;
				}
			}
		});
	};


	$scope.refreshConferences();

});