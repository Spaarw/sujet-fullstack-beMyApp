/**
 * @author      Pierre Petit
 * @description LOGS DATABASE MIDDLEWARES
 * @date        26/06/2017
 */

"use strict";

module.exports = function(manager) {

    /**
     * VALIDATE MIDDLEWARE
     */
    manager.pre('validate', function(next) {
        if (!this.date)
            this.date = new Date();
        if (!this.login)
            this.login = 'Unknown';
        if (!this.ipAddress)
            this.ipAddress = '0.0.0.0';
        next();
    });

};