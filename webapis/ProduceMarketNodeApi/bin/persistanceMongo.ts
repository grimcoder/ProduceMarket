///<reference path="definitions/nodejs.d.ts" />
///<reference path="models.ts" />

var models = require('./models');

var DB = () => {

    var db = {

        'prices': (callback) => {

            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');

            models.PriceModel(mongoose).find().exec((err, sets) => {
                callback(err, sets);
                mongoose.connection.close();
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

        'sales':  (callback) => {

            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');

            models.SaleModel(mongoose).find().exec((err, sets)=> {
                callback(err, sets);
                mongoose.connection.close();
            });
        },

        'salesfilter': (id, callback) => {

            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');

            models.SaleModel(mongoose).find({_id: id}).exec((err, sets)=> {
                callback(err, sets);
                mongoose.connection.close();
            });

        }
    };

    return db;
};
module.exports = DB;
