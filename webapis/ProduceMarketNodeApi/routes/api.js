var express = require('express');
var router = express.Router();
var prices =
    [{"Id":1,"Price":1.0,"ItemName":"Potato"},
        {"Id":2,"Price":2.0,"ItemName":"Cabbage"},
        {"Id":3,"Price":1.25,"ItemName":"Oranges"},
        {"Id":4,"Price":1.6,"ItemName":"Carrots"}];

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

module.exports = router;
