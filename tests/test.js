'use strict'
var path = require('path');
var winstonConf = require('winston-config');
var winston = require('winston');
global.conf = require('../config/appsettings');

winstonConf.fromFileSync(path.join(__dirname, '../config/winston-config.json'), function(error) {
    if (error) {
        console.log('error during winston configuration');
    } else {
        console.log('everything alright');
    }
});

var testLogger = winston.loggers.get('test');

var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var app = require('../server.js');
var request = require('request-promise');

describe('Hello World Test', function() {
    it('Run app perform GET, match text', function*() {
        var reply = yield request('http://localhost:3000');
        testLogger.verbose(reply);
        expect(reply).to.eql(global.conf.message);
    });

    it('Run app perform GET, full reply', function*() {
        var reply = yield request({
            uri: 'http://localhost:3000',
            resolveWithFullResponse: true
        });
        expect(reply.statusCode).to.eql(200);
        expect(reply.body).to.eql(global.conf.message);
    });
});
