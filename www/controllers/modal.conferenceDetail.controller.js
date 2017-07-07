/**
 * @author Pierre Petit
 * @description MODAL CONFERENCE DETAIL CONTROLLER
 * @date 27/06/2017
 * @copyright Rezocean
 */

"use strict";

app.controller('modalConferenceDetailController', function ($rootScope, $scope, $uibModalInstance, restService, conferenceId) {

	$scope.mode = conferenceId ? 'MODIFICATION' : 'CREATION';

	$scope.getDetail = function() {
		restService.get.conferencesDetail(conferenceId).then(function (response) {
			$scope.conference = response.data;
			$scope.conference.dateCreation = new Date($scope.conference.dateCreation);
			$scope.conference.dateLastModification = new Date($scope.conference.dateLastModification);
			$scope.conference.dateStart = new Date($scope.conference.dateStart);
		});
	};

	if ($scope.mode == 'MODIFICATION') {
		$scope.getDetail();
	}
	else {
		$scope.conferece = {dateStart: "", title: "", description: ""};
	}


	/**
	 * SEND DATE
	 * Used to create or update a conference
	 */
	$scope.sendData = function () {
		var _httpMethod = $scope.mode == 'CREATION' ? 'put' : 'post';
		restService[_httpMethod].conferences($scope.conference).then(function (response) {
			if (response) {
				$scope.close();
			}
		});
	};


	/**
	 * DELETE
	 * Used to delete a conference
	 */
	$scope.delete = function () {
		if ($scope.mode == 'MODIFICATION') {
			restService.delete.conferences(conferenceId).then(function(response) {
				if (response) {
					$scope.close();
				}
			});
		}
	};


	/**
	 * UPLOAD FILE
	 * Used to upload file
	 * @param file
	 */
	$scope.uploadLogo = function(file) {
		if (file) {
			restService.post.conferencesLogo(conferenceId, file).then(function(response) {
				if (response) {
					$scope.getDetail();
				}
			});
		}
	};


	/**
	 * CLOSE
	 * Used to close modal instance
	 */
	$scope.close = function () {
		$uibModalInstance.close();
	};

});