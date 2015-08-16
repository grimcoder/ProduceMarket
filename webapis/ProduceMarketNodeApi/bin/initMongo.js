///<reference path="definitions/nodejs.d.ts" />
var path = require('path'), utilities = require('./utils'), fs = require('fs');
var DB = function (callback) {
    var Db = require('mongodb').Db, MongoClient = require('mongodb').MongoClient;
    var utils = utilities();
    var prices = utils.readFromFile("prices");
    var sales = utils.readFromFile("sales");
    var priceChanges = utils.readFromFile("priceChanges");
    MongoClient.connect('mongodb://127.0.0.1/ProduceMarket', function (err, db) {
        if (err)
            throw err;
        db.collection('prices').remove({}, function (err, db) {
        });
        db.collection('sales').remove({}, function (err, db) {
        });
        db.collection('priceChanges').remove({}, function (err, db) {
        });
        db.collection('prices').insert(prices.map(function (i) {
            delete i.Id;
            return i;
        }), function (err, inserted) {
        });
        db.collection('sales').insert(sales.map(function (i) {
            delete i.Id;
            return i;
        }), function (err, inserted) {
        });
        db.collection('priceChanges').insert(priceChanges.map(function (i) {
            delete i.Id;
            return i;
        }), function (err, inserted) {
        });
        db.close();
        callback();
    });
};
module.exports = DB;
//# sourceMappingURL=initMongo.js.map 
//# sourceMappingURL=initMongo.js.map