/**
 * Created by taras.kovtun on 8/10/2015.
 */
///<reference path="../bin/definitions/nodejs.d.ts" />
///<reference path="../bin/definitions/mongoose.d.ts" />

var path = require('path'), utilities = require('./../bin/utils'), fs = require('fs');
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient;

var utils = utilities();
var prices = utils.readFromFile("prices");
var sales = utils.readFromFile("sales");
var priceChanges = utils.readFromFile("priceChanges");


MongoClient.connect('mongodb://127.0.0.1:27017/ProduceMarket', function(err, db) {
    if(err) throw err;

    db.collection('prices').insert(prices, function (err, inserted) {});
    db.collection('sales').insert(prices, function (err, inserted) {});
    db.collection('priceChanges').insert(prices, function (err, inserted) {});



});

