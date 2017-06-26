/**
 * @author      Pierre Petit
 * @description CONFERENCES DATABASE SCHEMA
 * @date        26/06/2017
 */

"use strict";

module.exports = {
	dateCreation: {type: Date, required: false, default: Date.now},
	dateLastModification: {type: Date, required: false, default: Date.now},
	dateStart: {type: Date, required: false, default: Date.now},
	title: {type: String, required: false, default: null},
	description: {type: String, required: false, default: null},
	logo: {type: String, required: false, default: "/styles/images/default_conference.png"},
	archived: {type: Boolean, required: false, default: false}
};