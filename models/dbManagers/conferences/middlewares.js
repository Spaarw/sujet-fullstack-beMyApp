/**
 * @author      Pierre Petit
 * @description CONFERENCES DATABASE MIDDLEWARES
 * @date        26/06/2017
 */

"use strict";

module.exports = function (manager) {

	/**
	 * VALIDATE MIDDLEWARE
	 */
	manager.pre('validate', function (next) {
		if (!this.dateCreation) {
			this.dateCreation = new Date();
		}
		this.dateLastModification = new Date();
		if (!this.logo) {
			this.logo = "/styles/images/default_conference.png";
		}
		next();
	});

};