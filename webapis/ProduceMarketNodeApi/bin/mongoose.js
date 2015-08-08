/**
 * Created by taras.kovtun on 8/7/2015.
 */
///<reference path="definitions/nodejs.d.ts" />
///<reference path="definitions/mongoose.d.ts" />
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var carSchema = new Schema({ make: String, Color: String, model: String });
carSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
// Ensure virtual fields are serialised.
carSchema.set('toJSON', {
    virtuals: true
});
// Ensure virtual fields are serialised.
carSchema.set('toObject', {
    virtuals: true
});
var Truck = mongoose.model('Truck', carSchema);
var trucks;
var query = Truck.find(function (err, trks) {
    trucks = trks;
    console.log(trucks);
    process.exit();
});
var a = '';
//# sourceMappingURL=mongoose.js.map