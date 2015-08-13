///<reference path="definitions/nodejs.d.ts" />
var PriceModel = require('./models.ts').PriceModel;
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
        }
    };
    return db;
};
module.exports = DB;
//# sourceMappingURL=persistanceMongo.js.map