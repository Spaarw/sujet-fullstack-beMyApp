/**
 * @author Pierre Petit
 * @description CALL ON OVER MODULE
 * @date 09/05/2017
 * @copyright Rezocean
 */

"use strict";


module.exports = function(totalValue, options, callback) {
	var _this = this;
	_this.over = false;
	_this.current = options.initialValue || 0;


	/**
	 * NEXT
	 * Used to go next and callback if over
	 * @param err
	 * @param value
	 */
	_this.next = function(err, value) {
		_this.current++;
		if (err) {
			console.log("CallBackOnOver [error] :", err);
		}
		if (!_this.over && _this.current == totalValue) {
			_this.over = true;
			callback();
		}
		return {current:_this.current, progress:Math.round(_this.current / totalValue * 100)};
	};
};