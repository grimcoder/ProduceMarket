/**
 * Created by taraskovtun on 7/16/15.
 */
var express = require('express'),
    mongoskin = require('mongoskin'),
    bodyParser = require('body-parser'),
    logger = require('morgan');

var path = require('path');
var fs = require('fs');

var saveToFile = function (obj, filenam) {
    fs.writeFile(path.join(__dirname, '../data/', filenam), JSON.stringify(obj), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
};

var readFromFile = function (filenam) {
    var str = fs.readFileSync(path.join(__dirname, '../data/', filenam) + ".json", 'utf8');
    var obj = JSON.parse(str);
    return obj;

};

var prices = readFromFile("prices");
var sales = readFromFile("sales");
var priceChanges = readFromFile("priceChanges");

var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(logger());


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../app')));
app.use(express.static(path.join(__dirname, '../bower_components')));


app.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

app.get('/api/prices', function (req, res) {
    if (req.query.id) {
        res.json(
            prices.filter(
                function (i) {
                    return i.Id == req.query.id;
                })
        )
    }
    else {
        res.json(prices);
    }
});

app.post('/api/prices', function (req, res) {

    var data = req.body;
    var Action;
    var priceWas;
    if (data.Id) {
        Action = "Edit";
        priceWas = prices.filter(
            function (i) {
                return i.Id == data.Id;
            })[0].Price;

        prices = prices.filter(
            function (i) {
                return i.Id != data.Id;
            });
    }

    else {
        Action = "New";
        var maxId = prices.length == 0 ? 1 : prices.map(function (i) {
            return i.Id;
        })
            .reduce(function (previousValue, currentValue, index, array) {
                return previousValue < currentValue ? currentValue : previousValue;
            }) + 1;
        data.Id = maxId;
    }

    prices.push(data);
    data.Action = Action;
    data.priceWas = priceWas;
    priceChanges.push(data);
    saveToFile(prices, "prices.json");
    saveToFile(priceChanges, "priceChanges.json");
    res.sendStatus(200);

});

app.delete('/api/prices', function (req, res) {

    var id = req.query.id;
    var priceToDelete = prices.filter(function (i) {
        return i.Id == id;
    })[0];

    priceToDelete.Action = 'Delete';
    priceChanges.push(priceToDelete);


    prices = prices.filter(function (i) {
        return i.Id != id;
    });
    saveToFile(prices, "prices.json");
    saveToFile(priceChanges, "priceChanges.json");

    res.sendStatus(200);
});

app.delete('/api/sales', function (req, res) {

    var id = req.query.id;
    sales = sales.filter(function (i) {
        return i.Id != id;
    });
    saveToFile(sales, "sales.json");
    res.sendStatus(200);

});

app.post('/api/sales', function (req, res) {

    var sale = req.body;
    if (!sale.Id) {
        var maxId = sales.length == 0 ? 1 : sales.map(function (i) {
            return i.Id;
        })
            .reduce(function (previousValue, currentValue, index, array) {
                return previousValue < currentValue ? currentValue : previousValue;
            }) + 1;

        sale.Id = maxId;
    }

    sales = sales.filter(function (i) {

        return i.Id != sale.Id;

    });
    sales.push(sale);
    saveToFile(sales, "sales.json");
    res.sendStatus(200);

});

app.get('/api/sales', function (req, res) {
    if (req.query.id) {

        res.json(sales.filter(function (i) {
            return i.Id == req.query.id;
        }));
    }

    else {

        res.json(sales);

    }
});

app.get('/api/reports/prices', function (req, res) {
    res.json(priceChanges);
});


app.listen(3000, function () {
    console.log('Server is running')
});

