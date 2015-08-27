///<reference path="definitions/nodejs.d.ts" />

var path = require('path'), utilities = require('./utils'), fs = require('fs');
var DB = (callback) => {
    var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient;

    var utils = utilities();
    var prices = utils.readFromFile("prices");
    var sales = utils.readFromFile("sales");
    var priceChanges = utils.readFromFile("priceChanges");


    MongoClient.connect('mongodb://127.0.0.1/ProduceMarket', function(err, db) {

        if(err) throw err;

        db.collection('prices').remove({}, (err, db)=>{});
        db.collection('sales').remove({}, (err, db)=>{});
        db.collection('pricechanges').remove({}, (err, db)=>{});

        db.collection('prices').insert(prices.map((i)=>{delete i.Id; return i;}), function (err, inserted) {});

        db.collection('sales').insert(sales.map((i)=>{delete i.Id; return i;}), function (err, inserted) {});

        db.collection('pricechanges').insert(priceChanges.map((i)=>{delete i.Id; return i;}), function (err, inserted) {});

        db.close();

        callback();

    });
};
module.exports = DB;
//# sourceMappingURL=initMongo.js.map