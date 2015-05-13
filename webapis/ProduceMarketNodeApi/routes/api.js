var express = require('express');

var app = express();
var router = express.Router();
var prices =
        [{"Id":1,"Price":1.0,"ItemName":"Potato"},
        {"Id":2,"Price":2.0,"ItemName":"Cabbage"},
        {"Id":3,"Price":1.25,"ItemName":"Oranges"},
        {"Id":4,"Price":1.6,"ItemName":"Carrots"}];

// GET /prices?id=xxx

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
        res.json(prices);}
});

// DELETE /prices?id=xxx

router.handleDelete = function (req, res) {

    var id = req.query.id;
    prices = prices.filter(function(i){
        return i.Id != id;
    });

    res.sendStatus(200);


};

// POST /prices/
router.handlePost = function(req, res){
    var data = req.body;

    if (data.Id){
        prices = prices.filter(function(i){
            return i.Id != data.Id;
        });
    }
    else{
        var maxId = prices.length == 0 ? 1 : prices.map(function(i){return i.Id}).reduce(function(previousValue, currentValue, index, array) {
            return previousValue < currentValue ? currentValue : previousValue;
        }) + 1;

        data.Id = maxId;
    }

    prices.push(data);
    res.sendStatus(200);

}

module.exports = router;
