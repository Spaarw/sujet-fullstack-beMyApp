/**
 * @author Pierre Petit
 * @description TOOLSBOX OBJECT PROTOTYPES
 * @date 31/05/2017
 * @copyright Rezocean
 */

"use strict";


/**
 * OBJECT SIZE
 * Used to get an object length
 * @param object
 * @returns {number}
 */
Object.size = function (object) {
	var length = 0;
	for (var index in object) {
		if (object.hasOwnProperty(index)) {
			length++;
		}
	}
	return length;
};


/**
 * OBJECT GET
 * Used to get an object property securely
 * @param object
 * @param property
 * @returns {*}
 */
Object.get = function (object, property) {
	if (property && typeof property == 'string') {
		var properties = property.split('.');
		for (var i = 0; i < properties.length; i++) {
			if (object && object[properties[i]] != undefined) {
				object = object[properties[i]];
			}
			else {
				return null;
			}
		}
	}
	return object;
};