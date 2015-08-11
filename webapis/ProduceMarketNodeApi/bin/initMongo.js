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
        db.collection('prices').insert(prices, function (err, inserted) {
        });
        db.collection('sales').insert(prices, function (err, inserted) {
        });
        db.collection('priceChanges').insert(prices, function (err, inserted) {
        });
        //callback();
    });
};
module.exports = DB;
//# sourceMappingURL=initMongo.js.map 
//# sourceMappingURL=initMongo.js.map