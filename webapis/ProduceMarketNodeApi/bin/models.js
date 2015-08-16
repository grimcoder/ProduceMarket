/**
 * Created by taras.kovtun on 8/7/2015.
 */
///<reference path="definitions/nodejs.d.ts" />
///<reference path="definitions/mongoose.d.ts" />
var a = function () {
    return 1;
};
var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var Price = new Schema({
    ItemName: String,
    Price: Number
});
Price.virtual('Id').get(function () {
    return this._id.toHexString();
});
// Ensure virtual fields are serialised.
Price.set('toJSON', {
    virtuals: true
});
// Ensure virtual fields are serialised.
Price.set('toObject', {
    virtuals: true
});
var Sale = new Schema({
    Date: Date,
    SaleDetails: [{
        "ItemName": String,
        "Price": Number,
        "Units": Number
    }]
});
Sale.virtual('Id').get(function () {
    return this._id.toHexString();
});
// Ensure virtual fields are serialised.
Sale.set('toJSON', {
    virtuals: true
});
// Ensure virtual fields are serialised.
Sale.set('toObject', {
    virtuals: true
});
var PriceChange = new Schema({});
PriceChange.virtual('Id').get(function () {
    return this._id.toHexString();
});
// Ensure virtual fields are serialised.
PriceChange.set('toJSON', {
    virtuals: true
});
// Ensure virtual fields are serialised.
PriceChange.set('toObject', {
    virtuals: true
});
module.exports = {
    PriceModel: function (mongoose) {
        return mongoose.model('Price', Price);
    },
    SaleModel: function (mongoose) {
        return mongoose.model('Sale', Sale);
    },
    PriceChangeModel: function (mongoose) {
        return mongoose.model('PriceChange', PriceChange);
    }
};
//# sourceMappingURL=models.js.map