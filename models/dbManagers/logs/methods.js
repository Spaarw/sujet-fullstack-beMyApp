/**
 * @author      Pierre Petit
 * @description LOGS DATABASE METHODS
 * @date        26/06/2017
 * @copyright   Rezocean
 */

"use strict";

var userAgentParser = require('ua-parser-js');

module.exports = function (manager) {

	/**
	 * GET CLIENT REQUEST PARAMETERS
	 * @param request
	 * @returns {*}
	 */
	manager.methods.getParameters = function (request) {
		if (request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE') {
			this.params = request.body;
		}
		else if (request.method == 'GET') {
			this.params = request.query || request.body;
		}
	};

	/**
	 * GET CLIENT IP ADDRESS
	 * @param request
	 * @returns {*}
	 */
	manager.statics.getIpAddress = function (request) {
		return Object.get(request, 'headers.x-forwarded-for') || Object.get(request, 'connection.remoteAddress') || Object.get(request, 'socket.remoteAddress') || Object.get(request, 'connection.socket.remoteAddress');
	};

	/**
	 * GET USER AGENT INFO
	 * Used to get user agent information
	 * @param request
	 */
	manager.methods.getUserAgentInfo = function (request) {
		this.userAgent = userAgentParser(request.headers['user-agent']);
		this.userAgent.os.name == 'Windows' ? request.session.currentOs = 'windows' : null;
		this.userAgent.os.name == 'Mac OS' ? request.session.currentOs = 'apple' : null;
		this.userAgent.os.name == 'Android' ? request.session.currentOs = 'android' : null;
		this.userAgent.os.name == 'iOS' ? request.session.currentOs = 'apple' : null;
		this.userAgent.os.name == 'Linux' ? request.session.currentOs = 'linux' : null;
		this.userAgent.os.name == 'Ubuntu' ? request.session.currentOs = 'linux' : null;
		this.userAgent.browser.name == 'Chrome' ? request.session.currentBrowser = 'chrome' : null;
		this.userAgent.browser.name == 'Chromium' ? request.session.currentBrowser = 'chrome' : null;
		this.userAgent.browser.name == 'Firefox' ? request.session.currentBrowser = 'firefox' : null;
		this.userAgent.browser.name == 'IE' ? request.session.currentBrowser = 'internet-explorer' : null;
		this.userAgent.browser.name == 'Opera' ? request.session.currentBrowser = 'opera' : null;
		this.userAgent.browser.name == 'Android Browser' ? request.session.currentBrowser = 'android' : null;
		this.userAgent.browser.name == 'Mozilla' ? request.session.currentBrowser = 'firefox' : null;
		this.userAgent.browser.name == 'Safari' ? request.session.currentBrowser = 'safari' : null;
		this.userAgent.browser.name == 'Edge' ? request.session.currentBrowser = 'edge' : null;
	}
};