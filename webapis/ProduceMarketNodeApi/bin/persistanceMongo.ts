///<reference path="definitions/nodejs.d.ts" />

var PriceModel = require('./models.ts').PriceModel;

var DB = ()=> {
    var db = {
        'prices': (callback) => {

            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/ProduceMarket');

            PriceModel.find().exec(callback);

        }

    };

    return db;
};
module.exports = DB;


//# sourceMappingURL=persistanceMongo.js.map