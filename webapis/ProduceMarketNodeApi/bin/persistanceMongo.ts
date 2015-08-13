///<reference path="definitions/nodejs.d.ts" />
var PriceModel = require('./models.ts').PriceModel;

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
    };
    return db;
};
module.exports = DB;
