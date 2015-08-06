/**
 * Created by taraskovtun on 7/16/15.
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    argv = require('optimist').argv,
    useMongo = argv.m ? true : false,
    initMongo = argv.i ? true : false,
    utilities = require('./utils'),
    fs = require('fs');

var utils = utilities();

console.log('Using mongo: ' + useMongo);
console.log('Init mongo: ' + initMongo);


if (initMongo) {
    require('./initMongo')();
    return
}

if (useMongo){
    var DB = require('./persistanceMongo')();
}
else {
    var DB = require('./persistanceJs');
}
var db = DB();
var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(logger());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../app')));
app.use(express.static(path.join(__dirname, '../bower_components')));

app.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

app.get('/api/prices', function (req, res) {
    if (req.query.id) {
        res.json(
            db.prices.filter(
                function (i) {
                    return i.Id == req.query.id;
                })
        )
    }
    else {
        res.json(db.prices);
    }
});

app.post('/api/prices', function (req, res) {

    var data = req.body;
    var Action;
    var priceWas;
    if (data.Id) {
        Action = "Edit";
        priceWas = db.prices.filter(
            function (i) {
                return i.Id == data.Id;
            })[0].Price;

        db.prices = db.prices.filter(
            function (i) {
                return i.Id != data.Id;
            });
    }

    else {
        Action = "New";
        var maxId = db.prices.length == 0 ? 1 : db.prices.map(function (i) {
            return i.Id;
        })
            .reduce(function (previousValue, currentValue) {
                return previousValue < currentValue ? currentValue : previousValue;
            }) + 1;
        data.Id = maxId;
    }

    db.prices.push(data);
    data.Action = Action;
    data.priceWas = priceWas;
    db.priceChanges.push(data);
    utils.saveToFile(db.prices, "prices.json");
    utils.saveToFile(db.priceChanges, "priceChanges.json");
    res.sendStatus(200);

});

app.delete('/api/prices', function (req, res) {

    var id = req.query.id;
    var priceToDelete = db.prices.filter(function (i) {
        return i.Id == id;
    })[0];

    priceToDelete.Action = 'Delete';
    db.priceChanges.push(priceToDelete);

    db.prices = db.prices.filter(function (i) {
        return i.Id != id;
    });

    utils.saveToFile(db.prices, "prices.json");

    utils.saveToFile(db.priceChanges, "priceChanges.json");

    res.sendStatus(200);
});

app.delete('/api/sales', function (req, res) {

    var id = req.query.id;
    db.sales = db.sales.filter(function (i) {
        return i.Id != id;
    });
    utils.saveToFile(db.sales, "sales.json");
    res.sendStatus(200);

});

app.post('/api/sales', function (req, res) {

    var sale = req.body;
    if (!sale.Id) {
        var maxId = db.sales.length == 0 ? 1 : db.sales.map(function (i) {
            return i.Id;
        })
            .reduce(function (previousValue, currentValue) {
                return previousValue < currentValue ? currentValue : previousValue;
            }) + 1;
        sale.Id = maxId;
    }

    db.sales = db.sales.filter(function (i) {
        return i.Id != sale.Id;
    });
    db.sales.push(sale);
    utils.saveToFile(db.sales, "sales.json");
    res.sendStatus(200);
});

app.get('/api/sales', function (req, res) {
    if (req.query.id) {
        res.json(db.sales.filter(function (i) {
            return i.Id == req.query.id;
        }));
    }
    else {
        res.json(db.sales);
    }
});

app.get('/api/reports/prices', function (req, res) {
    res.json(db.priceChanges);
});

app.listen(3000, function () {
    console.log('Server is running')
});