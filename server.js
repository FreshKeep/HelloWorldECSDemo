var express = require('express');
var path = require('path');
var winstonConf = require('winston-config');
var winston = require('winston');
var co = require('co');
global.conf = require('./config/appsettings');

winstonConf.fromFileSync(path.join(__dirname, './config/winston-config.json'), function(error) {
    if (error) {
        console.log('error during winston configuration');
    } else {
        console.log('everything alright');
    }
});

var appLogger = winston.loggers.get('application');

class App {
    * run() {
        this.app = express();
        this.app.get('/', function(req, res) {
            res.send(global.conf.message);
        });

        this.app.listen(3000, function() {
            appLogger.info('Example app listening on port 3000!');
        });
    }
}

co(function*() {
        // eslint-disable-next-line
        var app = new App();
        // eslint-disable-next-line
        yield app.run();
        // eslint-disable-next-line
    })
    .catch(function(err) {
        appLogger.error(err);
    });

module.exports = App;
