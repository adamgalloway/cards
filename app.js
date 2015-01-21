'use strict';

// Module dependencies.
var restify = require('restify'),
    path = require('path'),
    mongoose = require('mongoose'),
    fs = require('fs');


// Connect to database
var db = require('./config/db');


//app.use(express.static(__dirname + '/public'));


// Bootstrap models
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
    require(modelsPath + '/' + file);
});

var env = process.env.NODE_ENV || 'development';

if ('development' == env) {
} else if ('test' == env) {
} else if ('production' == env) {
}


var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || '3000';

var server = restify.createServer({
    name: 'Cards API'
});

// Bootstrap routes/api
var routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(function(file) {
    require(routesPath + '/' + file)(server);
});

server.use(restify.acceptParser(server.acceptable));
//server.use(restify.authorizationParser());
//server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

server.get(/\/public\/?.*/, restify.serveStatic({
    directory: __dirname,
    default: 'index.html'
}));

server.use(function logger(req,res,next) {
    console.log(new Date(),req.method,req.url);
    next();
});

server.on('uncaughtException',function(request, response, route, error){
    console.error(error.stack);
    response.send(error);
});

server.listen(port,host, function() {
    console.log('%s listening at %s', server.name, server.url);
});
