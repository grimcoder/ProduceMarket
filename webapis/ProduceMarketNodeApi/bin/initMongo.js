/**
 * Created by taras.kovtun on 8/6/2015.
 */

var path = require('path'),
    utilities = require('./utils'),
    fs = require('fs');

var DB = function() {
    var utils = utilities()
    var prices = utils.readFromFile("prices")
    var sales = utils.readFromFile("sales")
    var priceChanges = utils.readFromFile("priceChanges")


}

module.exports = DB;