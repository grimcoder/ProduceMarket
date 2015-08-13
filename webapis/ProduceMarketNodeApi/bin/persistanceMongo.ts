///<reference path="definitions/nodejs.d.ts" />
///<reference path="models.ts" />


var PriceModel = require('./models.ts').PriceModel;
var SaleModel = require('./models.ts').SaleModel;

var DB = ()=> {
    var db = {
        'prices': (callback) => {

            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');

            PriceModel.find().exec((err, sets)=>{
                callback(err, sets);
                mongoose.connection.close();
            });
        },

        'pricesfilter':  (id,callback)=> {
            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');

            PriceModel.find({_id: id}).exec((err, sets)=>{
                callback(err, sets);
                mongoose.connection.close();
            });
        },

        'sales':  (callback) => {

            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');

            SaleModel.find().exec((err, sets)=>{
                callback(err, sets);
                mongoose.connection.close();
            });
        },

        'salesfilter':  (id,callback)=> {

            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');

            SaleModel.find({_id: id}).exec((err, sets)=>{
                callback(err, sets);
                mongoose.connection.close();
            });

        }
    };

    return db;
};
module.exports = DB;
