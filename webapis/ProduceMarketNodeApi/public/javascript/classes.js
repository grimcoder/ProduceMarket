/**
 * Created by taraskovtun on 7/21/15.
 */
var ProduceMarket;
(function (ProduceMarket) {
    var Price = (function () {
        function Price(id, price, itemname) {
            this.Id = id;
            this.ItemName = itemname;
            this.Price = price;
        }

        return Price;
    })();
    ProduceMarket.Price = Price;
})(ProduceMarket || (ProduceMarket = {}));
//# sourceMappingURL=classes.js.map