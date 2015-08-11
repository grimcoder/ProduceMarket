///<reference path="definitions/nodejs.d.ts" />
var DB = function () {
    var path = require('path'), utilities = require('./utils'), fs = require('fs');
    var utils = utilities();
    var prices = utils.readFromFile("prices");
    var sales = utils.readFromFile("sales");
    var priceChanges = utils.readFromFile("priceChanges");
    var db = {
        'prices': function (callback) { return callback('', prices); },
        'sales': function () { return sales; },
        'priceChanges': function () { return priceChanges; },
        'pricesfilter': function (id) {
            return prices.filter(function (i) {
                return i.Id == id;
            });
        },
        'postprice': function (data) {
            var Action;
            var priceWas;
            if (data.Id) {
                Action = "Edit";
                priceWas = prices.filter(function (i) {
                    return i.Id == data.Id;
                })[0].Price;
                prices = prices.filter(function (i) {
                    return i.Id != data.Id;
                });
            }
            else {
                Action = "New";
                var maxId = prices.length == 0 ? 1 : prices.map(function (i) {
                    return i.Id;
                }).reduce(function (previousValue, currentValue) {
                    return previousValue < currentValue ? currentValue : previousValue;
                }) + 1;
                data.Id = maxId;
            }
            prices.push(data);
            var dataChanged = utils.cloneOfA(data);
            priceChanges.push(dataChanged);
            dataChanged.Action = Action;
            dataChanged.priceWas = priceWas;
            utils.saveToFile(prices, "prices.json");
            utils.saveToFile(priceChanges, "priceChanges.json");
        },
        'pricetodelete': function (Id) {
            var priceToDelete = prices.filter(function (i) {
                return Id == i.Id;
            })[0];
            priceToDelete.Action = 'Delete';
            priceChanges.push(priceToDelete);
            prices = prices.filter(function (i) {
                return i.Id != Id;
            });
            utils.saveToFile(prices, "prices.json");
            utils.saveToFile(priceChanges, "priceChanges.json");
        },
        'salestodelete': function (id) {
            sales = sales.filter(function (i) {
                return i.Id != id;
            });
            utils.saveToFile(sales, "sales.json");
        },
        'postsale': function (sale) {
            if (!sale.Id) {
                var maxId = sales.length == 0 ? 1 : sales.map(function (i) {
                    return i.Id;
                }).reduce(function (previousValue, currentValue) {
                    return previousValue < currentValue ? currentValue : previousValue;
                }) + 1;
                sale.Id = maxId;
            }
            sales = sales.filter(function (i) {
                return i.Id != sale.Id;
            });
            sales.push(sale);
            utils.saveToFile(sales, "sales.json");
        },
        salesfilter: function (id) {
            return sales.filter(function (i) {
                return i.Id == id;
            });
        }
    };
    return db;
};
module.exports = DB;
//# sourceMappingURL=persistanceJs.js.map 
//# sourceMappingURL=persistanceJs.js.map