/**
 * Created by taraskovtun on 7/16/15.
 */

///<reference path="definitions/nodejs.d.ts" />
//imports

var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    path = require('path'),
    utils = require('./utils')();


var app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.listen(5000, (err, obj) => {
    console.log('www static is running')
});
