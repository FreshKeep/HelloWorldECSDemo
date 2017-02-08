var express = require('express');
var app = express();
var path = require('path');
var winstonConf = require('winston-config');
var winston = require('winston');
global.conf = require('./config/appsettings');

winstonConf.fromFileSync(path.join(__dirname, './config/winston-config.json'), function(error) {
	if (error) {
		console.log('error during winston configuration');
	} else {
		console.log('everything alright');
	}
});

var appLogger = winston.loggers.get('application');

app.get('/', function(req, res) {
	res.send(global.conf.message);
});

app.listen(3000, function() {
	appLogger.info('Example app listening on port 3000!');
});
