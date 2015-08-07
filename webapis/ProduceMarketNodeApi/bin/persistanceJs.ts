///<reference path="definitions/nodejs.d.ts" />

var DB =  ()=> {
    var path = require('path'), utilities = require('./utils'), fs = require('fs');
    var utils = utilities();
    var prices = utils.readFromFile("prices");
    var sales = utils.readFromFile("sales");
    var priceChanges = utils.readFromFile("priceChanges");
    var db = {
        'prices': prices,
        'sales': sales,
        'priceChanges': priceChanges,
        'pricesfilter':  (id)=> {
            return prices.filter( (i)=> {
                return i.Id == id;
            });
        },
        'postprice':  (data) =>{
            var Action;
            var priceWas;
            if (data.Id) {
                Action = "Edit";
                priceWas = db.prices.filter((i) => {
                    return i.Id == data.Id;
                })[0].Price;
                db.prices = db.prices.filter((i) => {
                    return i.Id != data.Id;
                });
            }
            else {
                Action = "New";
                var maxId = db.prices.length == 0 ? 1 : db.prices.map(function (i) {
                    return i.Id;
                }).reduce( (previousValue, currentValue)=> {
                    return previousValue < currentValue ? currentValue : previousValue;
                }) + 1;
                data.Id = maxId;
            }
            db.prices.push(data);
            var dataChanged = utils.cloneOfA(data);
            db.priceChanges.push(dataChanged);
            dataChanged.Action = Action;
            dataChanged.priceWas = priceWas;
            utils.saveToFile(db.prices, "prices.json");
            utils.saveToFile(db.priceChanges, "priceChanges.json");
        },
        'pricetodelete':  (Id)=> {
            var priceToDelete = db.prices.filter( (i)=> {
                return Id == i.Id;
            })[0];
            priceToDelete.Action = 'Delete';
            db.priceChanges.push(priceToDelete);
            db.prices = db.prices.filter( (i)=> {
                return i.Id != Id;
            });
            utils.saveToFile(db.prices, "prices.json");
            utils.saveToFile(db.priceChanges, "priceChanges.json");
        },
        'salestodelete':  (id)=> {
            db.sales = db.sales.filter( (i)=> {
                return i.Id != id;
            });
            utils.saveToFile(db.sales, "sales.json");
        },
        'postsale':  (sale)=> {
            if (!sale.Id) {
                var maxId = db.sales.length == 0 ? 1 : db.sales.map(function (i) {
                    return i.Id;
                }).reduce( (previousValue, currentValue) => {
                    return previousValue < currentValue ? currentValue : previousValue;
                }) + 1;
                sale.Id = maxId;
            }
            db.sales = db.sales.filter( (i)=> {
                return i.Id != sale.Id;
            });
            db.sales.push(sale);
            utils.saveToFile(db.sales, "sales.json");
        },
        salesfilter:  (id)=> {
            return db.sales.filter( (i)=> {
                return i.Id == id;
            });
        }
    };
    return db;
};
module.exports = DB;
//# sourceMappingURL=persistanceJs.js.map