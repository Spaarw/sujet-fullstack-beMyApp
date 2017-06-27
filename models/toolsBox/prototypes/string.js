/**
 * @author Pierre Petit
 * @description TOOLSBOX STRING PROTOTYPES
 * @date 31/05/2017
 * @copyright Rezocean
 */

"use strict";


/**
 * STRING PROTOTYPE ESCAPE REGEX
 * Used to escape characters from a string for Regex use
 * @returns {string}
 */
String.prototype.escapeRegex = function () {
	return this.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};


/**
 * STRING PROTOTYPE CONTAINS
 * Used to check if a string contains another
 * @param string
 * @returns {boolean}
 */
String.prototype.contains = function (string) {
	return this.indexOf(string) > -1;
};


/**
 * STRING PROTOTYPE STARTS WITH
 * Used to check if a string starts with another
 * @param string
 * @returns {boolean}
 */
String.prototype.startsWith = function (string) {
	return this.indexOf(string) == 0;
};


/**
 * STRING PROTOTYPE IS IN ARRAY
 * Used to check if a String is in an Array
 * @param array
 * @returns {boolean}
 */
String.prototype.isInArray = function (array) {
	!Array.isArray(array) ? array = [array] : null;
	return array.indexOf(this) > -1;
};


/**
 * STRING PROTOTYPE EMAIL VALIDATOR
 * Used to validate a string email format
 * @returns {boolean}
 */
String.prototype.emailValidator = function () {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(this);
};


/**
 * STRING PROTOTYPE IP ADDRESS VALIDATOR
 * Used to validate a string ip address format
 * @returns {boolean}
 */
String.prototype.ipAddressValidator = function () {
	var re = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	return re.test(this);
};


/**
 * STRING PROTOTYPE RANDOM GENERATOR
 * Used to generate a random string
 * @param specialChars
 * @param length
 */
String.prototype.randomGenerator = function (specialChars, length) {
	var _pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	_pattern += specialChars === true ? '(){}[]+-*/=' : '';
	var _random = '';
	for (var i = 0; i < length; i++) {
		_random += _pattern.charAt(Math.floor(Math.random() * _pattern.length));
	}
	return _random;
};


/**
 * STRING PROTOTYPE TO OBJECT ID
 * Used to convert a string to Mongoose ObjectID
 * @returns {*}
 */
String.prototype.toObjectId = function () {
	var mongoose = require('mongoose');
	return mongoose.Types.ObjectId(this);
};


/**
 * STRING PROTOTYPE PARSE ALPHANUMERIC
 * Used to parse alphanumeric characters
 * @returns {string}
 */
String.prototype.parseAlphanumeric = function (allowedChars) {
	var _pattern = '[^a-z0-9' + (allowedChars || '') + ']';
	return this.replace(new RegExp(_pattern, 'gi'), '');
};


/**
 * STRING PROTOTYPE PARSE NUMERIC
 * Used to parse numeric characters
 * @param allowedChars
 * @returns {string}
 */
String.prototype.parseNumeric = function (allowedChars) {
	var _pattern = '[^0-9' + (allowedChars || '') + ']';
	return this.replace(new RegExp(_pattern, 'gi'), '');
};