/**
 * Created by taras.kovtun on 8/6/2015.
 */

var DB = function () {

    var path = require('path'),
        utilities = require('./utils'),
        fs = require('fs');

    var utils = utilities();
    var prices = utils.readFromFile("prices");
    var sales = utils.readFromFile("sales");
    var priceChanges = utils.readFromFile("priceChanges");

    var db = {
        'prices' : prices,
        'sales': sales,
        'priceChanges': priceChanges
    }

    return db;

}

module.exports = DB;
