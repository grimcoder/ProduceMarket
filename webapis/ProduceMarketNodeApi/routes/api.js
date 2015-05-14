var express = require('express');

var app = express();
var router = express.Router();

var prices =
        [{"Id":1,"Price":1.0,"ItemName":"Potato"},
        {"Id":2,"Price":2.0,"ItemName":"Cabbage"},
        {"Id":3,"Price":1.25,"ItemName":"Oranges"},
        {"Id":4,"Price":1.6,"ItemName":"Carrots"}];


var sales = [
    {
        Id: 1, Date: new Date(),
        SaleDetails: [
            {ItemName: 'Potato', Price: 1, Units: 2},
            {ItemName: 'Cabbage', Price: 1, Units: 2},
            {ItemName: 'Oranges', Price: 4, Units: 3},
    ]},
    {
        Id: 2, Date: new Date(),
        SaleDetails: [
            {ItemName: 'Potato', Price: 1, Units: 2},
            {ItemName: 'Cabbage', Price: 1, Units: 3},
            {ItemName: 'Oranges', Price: 5, Units: 2},
            {ItemName: 'Carrots', Price: 2.4, Units: 2},
    ]}
];


var incomes = [
    {
        Id: 1, Date: new Date(),
        SaleDetails: [
            {ItemName: 'Potato', Price: 1, Units: 2},
            {ItemName: 'Cabbage', Price: 1, Units: 2},
            {ItemName: 'Oranges', Price: 4, Units: 3},
    ]},
    {
        Id: 2, Date: new Date(),
        SaleDetails: [
            {ItemName: 'Potato', Price: 1, Units: 2},
            {ItemName: 'Cabbage', Price: 1, Units: 3},
            {ItemName: 'Oranges', Price: 5, Units: 2},
            {ItemName: 'Carrots', Price: 2.4, Units: 2},
    ]}
];

router.get('/prices', function(req, res, next) {
    if (req.query.id) {
        res.json(
            prices.filter(
                function(i)
                {
                    return i.Id==req.query.id;
                })
        )
    }
    else{
        res.json(prices);
    }
});

// DELETE /prices?id=xxx

router.handlePriceDelete = function (req, res){

    var id = req.query.id;
    prices = prices.filter(function(i){
        return i.Id != id;
    });
    res.sendStatus(200);

};

// POST /prices/
router.handlePricePost = function(req, res){
    var data = req.body;

    if (data.Id){
        prices = prices.filter(function(i){
            return i.Id != data.Id;
        });
    }
    else{
        var maxId = prices.length == 0 ? 1 : prices.map(function(i){return i.Id;})
            .reduce(function(previousValue, currentValue, index, array)
            {
                return previousValue < currentValue ? currentValue : previousValue;
            }) + 1;

        data.Id = maxId;
    }

    prices.push(data);
    res.sendStatus(200);

};

router.get('/sales', function(req, res, next){
    if (req.query.id){

        res.json(sales.filter(function(i){
            return i.Id == req.query.id;
        }));
    }

    else{

        res.json(sales);

    }
});


router.get('/incomes', function(req, res, next){
    if (req.query.id)
    {
        res.json(incomes.filter(function(i){
            return i.Id == req.query.id;
        }));
    }

    else{

        res.json(sales);

    }
});


router.handleSaleDelete = function (req, res){

    var id = req.query.id;
    sales = sales.filter(function(i){
        return i.Id != id;
    });
    res.sendStatus(200);

};



router.handleSaleUpdate = function (req, res){

    var sale = req.body;
    if (!sale.Id){
        var maxId = sales.length == 0 ? 1 : sales.map(function(i){return i.Id;})
            .reduce(function(previousValue, currentValue, index, array)
            {
                return previousValue < currentValue ? currentValue : previousValue;
            }) + 1;

        sale.Id = maxId;
    }

    sales = sales.filter(function(i){

        return i.Id != sale.Id;

    });
    sales.push(sale);

    res.sendStatus(200);

};



module.exports = router;
