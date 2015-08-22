/**
 * Created by taraskovtun on 7/16/15.
 */
///<reference path="definitions/nodejs.d.ts" />
//imports
var express = require('express'), bodyParser = require('body-parser'), logger = require('morgan'), argv = require('optimist').argv, useMongo = argv.m ? true : false, initMongo = argv.i ? true : false, path = require('path'), utils = require('./utils')();
//when run with -i switch init mongo db and exit
if (initMongo) {
    require('./initMongo')(process.exit);
}
//# sourceMappingURL=tools.js.map