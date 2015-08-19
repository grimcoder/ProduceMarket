///<reference path="definitions/nodejs.d.ts" />
///<reference path="models.ts" />
///<reference path="definitions/mongoose.d.ts" />
var models = require('./models'), utilities = require('./utils'), fs = require('fs');
var utils = utilities();
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
        },
        'postprice': function (data, callback) {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            var Action;
            var priceWas;
            if (data.Id) {
                Action = "Edit";
                models.PriceModel(mongoose).findOne({_id: data.Id}, function (err, set) {
                    var oldPrice = set.Price;
                    models.PriceModel(mongoose).update({_id: data.Id}, data, {upsert: true}, function (err, set) {
                        if (err)
                            callback(undefined, err);
                        data.Action = Action;
                        data.priceWas = oldPrice;
                        var newPriceChangeModel = new models.PriceChangeModel(mongoose)({
                            Price: data.Price,
                            ItemName: data.ItemName,
                            Action: data.Action,
                            priceWas: data.priceWas
                        });
                        newPriceChangeModel.save(function (err) {
                            if (err)
                                callback(undefined, err);
                            callback("succesfully saved");
                            mongoose.connection.close();
                        });
                    });
                });
            }
            else {
                Action = "New";
                var newPrice = new models.PriceModel(mongoose)(data);
                var newPriceChangeModel = new models.PriceChangeModel(mongoose)(data);
                newPrice.save(function (err) {
                    if (err)
                        callback(undefined, err);
                    data.Action = Action;
                    //                      data.priceWas = oldPrice;
                    newPriceChangeModel.save(function (err) {
                        if (err)
                            callback(undefined, err);
                        callback("succesfully saved");
                        mongoose.connection.close();
                    });
                });
            }
        },
        'salestodelete': function (id, callback) {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            models.SaleModel(mongoose).find({_id: id}).remove(function (err, sets) {
                mongoose.connection.close();
                callback(err, sets);
            });
        }
    };
    return db;
};
module.exports = DB;
//# sourceMappingURL=persistanceMongo.js.map