/**
 * @author      Pierre Petit
 * @description CONFERENCES DATABASE MANAGER
 * @date        26/06/2017
 */

"use strict";

var mongoose = require('mongoose');


/*
 * ##########  ---------- ################## ----------  ##########
 * ##########  ---------- SCHEMA DECLARATION ----------  ##########
 * ##########  ---------- ################## ----------  ##########
 * */


var conferencesSchema = new mongoose.Schema(require('./schema.js'));


/*
 * ##########  ---------- ########### ----------  ##########
 * ##########  ---------- MIDDLEWARES ----------  ##########
 * ##########  ---------- ########### ----------  ##########
 * */


require('./middlewares.js')(conferencesSchema);


/*
 * ##########  ---------- ####### ----------  ##########
 * ##########  ---------- METHODS ----------  ##########
 * ##########  ---------- ####### ----------  ##########
 * */


require('./methods.js')(conferencesSchema);


/*
 * ##########  ---------- ########### ----------  ##########
 * ##########  ---------- EXPORTATION ----------  ##########
 * ##########  ---------- ########### ----------  ##########
 * */


module.exports = mongoose.model('Conferences', conferencesSchema);