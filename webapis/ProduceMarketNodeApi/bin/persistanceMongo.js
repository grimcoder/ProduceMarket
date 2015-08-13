///<reference path="definitions/nodejs.d.ts" />
///<reference path="models.ts" />
var PriceModel = require('./models.ts').PriceModel;
var SaleModel = require('./models.ts').SaleModel;
var DB = function () {
    var db = {
        'prices': function (callback) {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            PriceModel.find().exec(function (err, sets) {
                callback(err, sets);
                mongoose.connection.close();
            });
        },
        'pricesfilter': function (id, callback) {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            PriceModel.find({ _id: id }).exec(function (err, sets) {
                callback(err, sets);
                mongoose.connection.close();
            });
        },
        'sales': function (callback) {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            SaleModel.find().exec(function (err, sets) {
                callback(err, sets);
                mongoose.connection.close();
            });
        },
        'salesfilter': function (id, callback) {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            SaleModel.find({ _id: id }).exec(function (err, sets) {
                callback(err, sets);
                mongoose.connection.close();
            });
        }
    };
    return db;
};
module.exports = DB;
//# sourceMappingURL=persistanceMongo.js.map