///<reference path="definitions/nodejs.d.ts" />
///<reference path="models.ts" />
///<reference path="definitions/mongoose.d.ts" />

var models = require('./models'),
    utilities = require('./utils'),
    fs = require('fs');
var utils = utilities();

var DB = () => {
    var db = {
        'prices': (callback) => {
            var mongoose = require('mongoose');
            var db = mongoose.createConnection('mongodb://localhost/ProduceMarket');
            models.PriceModel(db).find().exec((err, sets) => {
                callback(err, sets);
                db.close();
            });
        },
        'pricesfilter': (id, callback) => {

            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');

            models.PriceModel(mongoose).find({_id: id}).exec((err, sets)=> {
                callback(err, sets);
                mongoose.connection.close();
            });
        },
        'sales': (callback) => {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            models.SaleModel(mongoose).find().exec((err, sets)=> {
                callback(err, sets);
                mongoose.connection.close();
            });
        },
        'salesfilter': (id, callback) => {
            var mongoose = require('mongoose');
            var db = mongoose.createConnection('mongodb://localhost/ProduceMarket');
            models.SaleModel(db).find({_id: id}).exec((err, sets)=> {
                callback(err, sets);
                db.close();
            });
        },
        'pricetodelete': (id, callback)=> {

            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');

            models.PriceModel(mongoose).find({_id: id}).remove((err, sets)=> {
                mongoose.connection.close();
                callback(err, sets);
            });
        },
        'postprice': (data, callback) => {

            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');

            var Action;
            var priceWas;

            if (data.Id) {

                Action = "Edit";

                models.PriceModel(mongoose).findOne({_id: data.Id}, (err, set) => {

                    var oldPrice = set.Price;
                    models.PriceModel(mongoose).update({_id: data.Id}, data, {upsert: true}, (err, set) => {

                        if (err) callback(undefined, err);

                        data.Action = Action;
                        data.priceWas = oldPrice;

                        var newPriceChangeModel = new models.PriceChangeModel(mongoose)({
                                Price: data.Price,
                                ItemName: data.ItemName,
                                Action: data.Action,
                                priceWas: data.priceWas
                            }
                        );

                        newPriceChangeModel.save((err) => {
                            if (err) callback(undefined, err);
                            callback("succesfully saved");
                            mongoose.connection.close();

                        });
                    });
                })
            }

            else {
                Action = "New";
                var newPrice = new models.PriceModel(mongoose)(data);
                var newPriceChangeModel = new models.PriceChangeModel(mongoose)(data);

                newPrice.save((err) => {
                    if (err) callback(undefined, err);
                    data.Action = Action;
                    newPriceChangeModel.save((err) => {
                        if (err) callback(undefined, err);
                        callback("succesfully saved");
                        mongoose.connection.close();
                    });
                });
            }
        },
        'salestodelete': (id, callback)=> {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            models.SaleModel(mongoose).find({_id: id}).remove((err, sets)=> {
                mongoose.connection.close();
                callback(err, sets);
            });
        },
        'postsale': (data, callback)=> {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');
            if (data.Id) {
                models.SaleModel(mongoose).findOne({_id: data.Id}, (err, set) => {
                    models.SaleModel(mongoose).update({_id: data.Id}, data, {upsert: true}, (err, set) => {
                        if (err) callback(undefined, err);
                        callback("Sale succesfully saved");
                        mongoose.connection.close();
                    });
                })
            }
            else {
                var newPrice = new models.SaleModel(mongoose)(data);
                newPrice.save((err) => {
                    if (err) callback(undefined, err);
                    mongoose.connection.close();
                    callback("Sale succesfully created");
                });
            }
        }
    };
    return db;
};
module.exports = DB;
