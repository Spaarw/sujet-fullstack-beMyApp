/**
 * @author Pierre Petit
 * @description TOOLSBOX ARRAY PROTOTYPES
 * @date 31/05/2017
 * @copyright Rezocean
 */

"use strict";


/**
 * ARRAY PROTOTYPE FIND OBJECT INDEX
 * Used to find an object index in an array by key and value
 * @param key
 * @param value
 * @returns {number}
 */
Array.prototype.findObjectIndex = function (key, value) {
	for (var i = 0; i < this.length; i++) {
		if (Object.get(this[i], key) == value) {
			return i;
		}
	}
	return -1;
};