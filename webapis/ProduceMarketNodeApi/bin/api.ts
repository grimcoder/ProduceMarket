/**
 * Created by taraskovtun on 7/16/15.
 */

///<reference path="definitions/nodejs.d.ts" />

var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    argv = require('optimist').argv,
    useMongo = argv.m ? true : false,
    path = require('path'),
    utils = require('./utils')();

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

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(logger());


//allow CORS
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/api/prices', (req, res) => {
    if (req.query.id) {
        db.pricesfilter(req.query.id, (err, result) =>res.json(result))
    }
    else {
        db.prices((err, result) =>res.json(result));
    }
});

app.post('/api/prices', (req, res) => {
    var data = req.body;
    db.postprice(data, (result, err)=> {

        if (err) {
            res.sendStatus(500);
        }
        else {
            res.json(result)
        }
    });
});

app.delete('/api/prices', (req, res) => {
    var id = req.query.id;
    db.pricetodelete(id, (err, result) =>res.sendStatus(200));
});

app.delete('/api/sales', (req, res) => {

    var id = req.query.id;
    db.salestodelete(id, (err, result)=> {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200)
        }
    });
});

app.post('/api/sales', (req, res) => {

    var sale = req.body;
    db.postsale(sale, (result, err)=> {

        if (err) {
            res.sendStatus(500);
        }
        else {
            res.json(result)
        }
    });

});

app.get('/api/sales', (req, res) => {

    if (req.query.id) {
        db.salesfilter(req.query.id, (err, result) =>res.json(result))
    }
    else {
        db.sales((err, result) =>res.json(result));
    }

});

app.get('/api/reports/prices', (req, res) => {
    db.priceChanges((data)=> {
        res.json(data)
    });
});

app.get('/api/trucks', (req, res) => {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');
    var Schema = mongoose.Schema;

    var carSchema = new Schema({make: String, Color: String, model: String});

    var Truck = mongoose.model('Truck', carSchema);
    var trucks;

    var query = Truck.find((err, trks)=> {
        trucks = trks;
        console.log(trucks);
        res.json(trucks);
    })
});

app.listen(3000, (err, obj) => {
    console.log('api is running')
});