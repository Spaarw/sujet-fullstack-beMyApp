/**
 * @author      Pierre Petit
 * @description LOGS DATABASE SCHEMA
 * @date        26/06/2017
 * @copyright   Rezocean
 */

"use strict";

var mongoose = require('mongoose');

module.exports = {
	date: {type: Date, required: false, default: Date.now},
	ipAddress: {type: String, required: false, default: null},
	method: {type: String, required: false, default: null},
	url: {type: String, required: false, default: null},
	userAgent:{type:mongoose.Schema.Types.Mixed, required:false, default:null},
	params: {type: mongoose.Schema.Types.Mixed, required: false, default: null},
	responseTime: {type: Number, required: false, default: 0},
	status: {type: Number, required: false, default: 0},
	response: {type: mongoose.Schema.Types.Mixed, required: false, default: null},
	error: {type: mongoose.Schema.Types.Mixed, required: false, default: null}
};