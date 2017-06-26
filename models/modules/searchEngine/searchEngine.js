/**
 * @author Pierre Petit
 * @description SEARCH ENGINE MODULE
 * @date 26/06/2017
 */

"use strict";

var mongoose = require('mongoose');

var searchEngineConfig = require(PATH_CONFIGS + '/searchEngine.conf');

var CallbackOnOver = require(PATH_MODULES + '/callbackOnOver/callbackOnOver');

module.exports = function (search, session) {


	/**
	 * TYPPED VALUE
	 * Used to return a typped value
	 * @param field
	 * @returns {*}
	 * @private
	 */
	var _typpedValue = function (field) {
		switch (field.type) {
			case 'Number':
				return Number(search) || 0;
				break;
			default:
				return search;
				break;
		}
	};


	/**
	 * GET SEARCH OBJECT BY OPERATOR
	 * Used to return search object by operator
	 * @param field
	 * @returns {{$regex, $options: string}}
	 * @private
	 */
	var _getSearchObjectByOperator = function (field) {
		switch (field.operator) {
			case '+-':
				return {$regex: _typpedValue(field), $options: 'i'};
				break;
			case '!=':
				return {$ne: _typpedValue(field)};
				break;
			case '>=':
				return {$gte: _typpedValue(field)};
				break;
			case '>':
				return {$gt: _typpedValue(field)};
				break;
			case '<=':
				return {$lte: _typpedValue(field)};
				break;
			case '<':
				return {$lt: _typpedValue(field)};
			default:
				return _typpedValue(field);
				break;
		}
	};


	/**
	 * SEARCH BY FIELD
	 * Used to return a search object by field
	 * @param field
	 * @param callback
	 * @private
	 */
	var _searchByField = function (field, callback) {
		var object = {};
		if (field.name) {
			if (!field.reference) {
				object[field.name] = _getSearchObjectByOperator(field);
				callback(null, object);
			}
			else {
				var reference = field.reference.split('|');
				var referenceModel = mongoose.model(reference[0]);
				var findInReferenceObject = {};
				findInReferenceObject[reference[1]] = _getSearchObjectByOperator(field);
				referenceModel.find(findInReferenceObject, function (err, docs) {
					if (err) {
						callback(err, null);
					}
					else {
						var docsFields = [];
						for (var i = 0; i < docs.length; i++) {
							docsFields.push(docs[i][reference[2]]);
						}
						object[field.name] = {$in: docsFields};
						callback(null, object);
					}
				});
			}
		}
		else {
			callback(null, null);
		}
	};


	/**
	 * SELECT FIELDS OBJECT
	 * Used to return selected fields object
	 * @param fields
	 * @returns {{}}
	 * @private
	 */
	var _selectFieldsObject = function (fields) {
		var selectedFields = {};
		for (var index in fields) {
			if (fields[index].name) {
				selectedFields[fields[index].name] = 1;
			}
		}
		return selectedFields;
	};


	/**
	 * POPULATES
	 * Used to return populate Array
	 * @param fields
	 * @returns {Array}
	 * @private
	 */
	var _populates = function (fields) {
		var populate = [];
		for (var index in fields) {
			if (fields[index].reference) {
				var reference = fields[index].reference.split('|');
				var existing = false;
				for (var index2 in populate) {
					if (populate[index2].path == fields[index].name) {
						existing = true;
						populate[index2].select += ' ' + reference[1];
					}
				}
				if (!existing) {
					populate.push({path: fields[index].name, select: reference[1]})
				}
			}
		}
		return populate;
	};


	/**
	 * SEARCH
	 * Used to get search object by categoryName
	 * @param collection
	 * @param options
	 * @param options.limit
	 * @param callback
	 */
	this.search = function (collection, options, callback) {
		if (searchEngineConfig[collection]) {
			var configuration = searchEngineConfig[collection];
			var search = {$or: []};
			var callbackOnOver = new CallbackOnOver(configuration._fields.length, {}, function () {
				if (!session.isMaster) {
					for (var fieldName in configuration._restrictions) {
						search[fieldName] = JSON.parse(configuration._restrictions[fieldName].replace('|SESSIONS_CLIENT_ID|', session.clientId));
					}
				}
				mongoose.model(collection)
					.find(search, _selectFieldsObject(configuration._fields))
					.populate(_populates(configuration._fields))
					.limit(Object.get(options, 'limit') || 100)
					.exec(function (err, docs) {
						if (err) {
							callback(err, null);
						}
						else {
							mongoose.model(collection).count(search, function (err, nbTotal) {
								if (err) {
									callback(err, null);
								}
								else {
									callback(null, {docs: docs, nbTotal: nbTotal});
								}
							});
						}
					});
			});
			for (var i = 0; i < configuration._fields.length; i++) {
				var field = configuration._fields[i];
				if (field.name && (!field.private || session.isMaster)) {
					_searchByField(field, function (err, object) {
						if (err) {
							callbackOnOver.next(err);
						}
						else {
							search.$or.push(object);
							callbackOnOver.next();
						}
					});
				}
				else {
					callbackOnOver.next();
				}
			}
		}
		else {
			callback(new Error('SEARCH_ENGINE: Unknown collection [' + categoryName + ']'), null);
		}
	}
};