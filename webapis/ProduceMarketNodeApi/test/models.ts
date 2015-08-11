/**
 * Created by taras.kovtun on 8/10/2015.
 */
///<reference path="../bin/definitions/nodejs.d.ts" />
///<reference path="../bin/definitions/mongoose.d.ts" />

var mongoose  = require('mongoose')

var Schema = mongoose.Schema;
var User = new Schema({
    first_name: String,
    last_name: String
})

var UserModel = mongoose.model('User', User)

module.exports = {
    user: UserModel
}