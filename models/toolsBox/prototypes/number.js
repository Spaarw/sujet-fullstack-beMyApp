/**
 * @author Pierre Petit
 * @description TOOLSBOX NUMBER PROTOTYPES
 * @date 31/05/2017
 * @copyright Rezocean
 */

"use strict";


/**
 * NUMBER PROTOTYPE FORMAT BYTES
 * Used to convert bytes to string format
 * @param diviser (1024 || 1000)
 * @param precision
 * @returns {string}
 */
Number.prototype.formatBytes = function (diviser, precision) {
	if (!this) return '0 Byte';
	!diviser ? diviser = 1024 : null;
	!precision ? precision = 0 : null;
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	var i = parseInt(Math.floor(Math.log(this) / Math.log(diviser)));
	return (this / Math.pow(diviser, i)).toFixed(precision) + ' ' + sizes[i];
};