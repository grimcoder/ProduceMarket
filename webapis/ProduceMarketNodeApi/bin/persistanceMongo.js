///<reference path="definitions/nodejs.d.ts" />
///<reference path="models.ts" />
var models = require('./models');
var DB = function () {
    var db = {
        'prices': function (callback) {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            models.PriceModel(mongoose).find().exec(function (err, sets) {
                callback(err, sets);
                mongoose.connection.close();
            });
        },
        'pricesfilter': function (id, callback) {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            models.PriceModel(mongoose).find({ _id: id }).exec(function (err, sets) {
                callback(err, sets);
                mongoose.connection.close();
            });
        },
        'sales': function (callback) {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            models.SaleModel(mongoose).find().exec(function (err, sets) {
                callback(err, sets);
                mongoose.connection.close();
            });
        },
        'salesfilter': function (id, callback) {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            models.SaleModel(mongoose).find({ _id: id }).exec(function (err, sets) {
                callback(err, sets);
                mongoose.connection.close();
            });
        },
        'pricetodelete': function (id, callback) {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            models.PriceModel(mongoose).find({ _id: id }).remove(function (err, sets) {
                mongoose.connection.close();
                callback(err, sets);
            });
        }
    };
    return db;
};
module.exports = DB;
//# sourceMappingURL=persistanceMongo.js.map