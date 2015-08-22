/**
 * Created by taraskovtun on 7/16/15.
 */

///<reference path="definitions/nodejs.d.ts" />

var express = require('express'),
    path = require('path')

var app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000, (err, obj) => {
    console.log('Server is running at http://127.0.0.1:3000/')
});
