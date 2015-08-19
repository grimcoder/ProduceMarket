/**
 * Created by taraskovtun on 7/16/15.
 */
///<reference path="definitions/nodejs.d.ts" />
//imports
var express = require('express'), bodyParser = require('body-parser'), logger = require('morgan'), argv = require('optimist').argv, useMongo = argv.m ? true : false, initMongo = argv.i ? true : false, path = require('path'), utils = require('./utils')();
//when run with -i switch init mongo db and exit
if (initMongo) {
    require('./initMongo')(process.exit);
}
//if running script with -m switch use Mongo otherwise use file storage
if (useMongo) {
    var DB = require('./persistanceMongo');
}
else {
    var DB = require('./persistanceJs');
}
var db = DB();
var app = express();
console.log('Using mongo: ' + useMongo);
console.log('Init mongo: ' + initMongo);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(logger());
app.use(express.static(path.join(__dirname, '../public')));
app.get('/api/prices', function (req, res) {
    if (req.query.id) {
        db.pricesfilter(req.query.id, function (err, result) { return res.json(result); });
    }
    else {
        db.prices(function (err, result) { return res.json(result); });
    }
});
app.post('/api/prices', function (req, res) {
    var data = req.body;
    db.postprice(data, function (result, err) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.json(result);
        }
    });
});
app.delete('/api/prices', function (req, res) {
    var id = req.query.id;
    db.pricetodelete(id, function (err, result) { return res.sendStatus(200); });
});
app.delete('/api/sales', function (req, res) {
    var id = req.query.id;
    db.salestodelete(id, function (err, result) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    });
});
app.post('/api/sales', function (req, res) {
    var sale = req.body;
    db.postsale(sale, function (result, err) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.json(result);
        }
    });
});
app.get('/api/sales', function (req, res) {
    if (req.query.id) {
        db.salesfilter(req.query.id, function (err, result) { return res.json(result); });
    }
    else {
        db.sales(function (err, result) { return res.json(result); });
    }
});
app.get('/api/reports/prices', function (req, res) {
    res.json(db.priceChanges());
});
app.get('/api/trucks', function (req, res) {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');
    var Schema = mongoose.Schema;
    var carSchema = new Schema({ make: String, Color: String, model: String });
    var Truck = mongoose.model('Truck', carSchema);
    var trucks;
    var query = Truck.find(function (err, trks) {
        trucks = trks;
        console.log(trucks);
        res.json(trucks);
    });
});
app.listen(3000, function (err, obj) {
    console.log('Server is running');
});
//# sourceMappingURL=www.js.map