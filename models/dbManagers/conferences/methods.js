/**
 * @author      Pierre Petit
 * @description CONFERENCES DATABASE METHODS
 * @date        26/06/2017
 */

"use strict";

var multer = require('multer');
var moment = require('moment');

module.exports = function (manager) {

	/**
	 * MULTER UPLOADER
	 * Used to parse and save logo file
	 */
	manager.statics.uploader = multer({
		storage: multer.diskStorage({
			destination:function(req, file, next) {
				next(null, PATH_PUBLIC + '/styles/images/');
			},
			filename:function(req, file, next) {
				var splittedFileName = file.originalname.split('.');
				if (Object.get(splittedFileName, 'length')) {
					var extension = splittedFileName[splittedFileName.length - 1].toUpperCase();
					if (extension == 'PNG' || extension == 'JPG' || extension == 'JPEG' || extension == 'GIF') {
						next(null, moment().format('x') + '.' + extension);
					}
					else {
						next(new Error('CONFERENCES [uploader]: file [' + file.originalname + '] extension is not valid.'), null);
					}
				}
				else {
					next(new Error('CONFERENCES [uploader]: file [' + file.originalname + '] extension is not valid.'), null);
				}
			}
		}),
		limits: {
			fieldNameSize: 100,
			fileSize: 20000000,
			files: 1,
			fields: 5
		}
	}).single('file');

};