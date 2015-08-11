/**
 * Created by taras.kovtun on 8/7/2015.
 */

///<reference path="definitions/nodejs.d.ts" />
///<reference path="definitions/mongoose.d.ts" />

var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var Price = new Schema({
    ItemName : String,
    Price : Number
})

var Sale = new Schema({
    Date : Date,
    SaleDetails : [{
        "ItemName": String,
        "Price": Number,
        "Units": Number
    }]
})


var PriceChange = new Schema({

})

var PriceModel = mongoose.model('Price', Price )

module.exports = {
    Price: PriceModel
}