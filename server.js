/**
 * @author Pierre Petit
 * @description EXPRESS SERVER MAIN FILE
 * @date 26/06/2017
 * @copyright Rezocean
 */

"use strict";

// #################################
// REQUIRED DEPENDENCIES
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(expressSession);
var helmet = require('helmet');
var compression = require('compression');
// #################################


// #################################
// PATH DECLARATION
global.PATH_PUBLIC = "/www/";
global.PATH_MODULES = "/models/modules";
global.PATH_DB_MANAGERS = "/models/dbManagers";
global.PATH_MIDDLEWARES = "/models/middlewares";
// #################################


// #################################
// DATABASE CONFIGURATION
var connectionString = 'mongodb://' + process.env._dbHost + ':' + process.env._dbPort + '/' + process.env._dbName;
var options = {
	auth: {authdb: process.env._dbUserDatabase},
	user: process.env._dbUser,
	pass: process.env._dbPassword
};
var connection = mongoose.createConnection(connectionString, options);
mongoose.connect(connectionString, options);
mongoose.connection.once('connected', function (err) {
	console.log(err || "Connected to Airport DB");
}).on('error', function (err) {
	console.log(err);
}).on('disconnected', function () {
	self.connectToDatabase();
});
// #################################


// #################################
// EXPRESS CONFIGURATION
var server = express();
var http = require('http').createServer(server);
server.timeout = 0;
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json({limit: '200mb'}));
server.use(express.static(PATH_PUBLIC));
var session = expressSession({
	secret: '*l1f31$c0mpl1c4t3d*',
	name: '*th1$1$y0url1f3*',
	store: new MongoStore({mongooseConnection: connection}),
	cookie: {
		secure: false,
		httpOnly: true,
		maxAge: 86400000 // One day
	},
	resave: true,
	saveUninitialized: false
});
server.use(session);
server.use(helmet());
server.disable('x-powered-by'); // For security reason
server.use(compression());
// #################################


// #################################
// MIDDLEWARES DECLARATION
server.use(require(PATH_MIDDLEWARES + '/logger'));
// #################################


// #################################
// SOCKET.IO CONFIGURATION
var io = require('socket.io')(http);
io.on('connection', function (socket) {
	console.log('Socket [' + socket.id + '] connected');

	// Send socket ID
	socket.emit('connection:sid', socket.id);

	socket.on('error', function (err) {
		console.log('Socket [' + socket.id + '] error : ', err);
	});

	socket.once('disconnect', function () {
		console.log('Socket [' + socket.id + '] disconnected');
	});

});
// #################################


// #################################
// GLOBAL HTTP STATUS CONFIGURATION
global.HTTP_SUCCESS = 200;
global.HTTP_FAILED = 424;
global.HTTP_INTERNAL_ERROR = 500;
// #################################


// #################################
// LISTEN ON DEFAULT PORT
console.log('Server is listening on port', process.env._port || 8080);
http.listen(process.env._port || 8080);
// #################################