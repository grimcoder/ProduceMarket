var apiHost = "http://127.0.0.1:3001"

angular.module('produceMarketApp.services', []).factory('$Prices', function ($http) {

    var serviceInstance = {

        counter: 0,
        getPrices: function () {
            return $http.get(apiHost + '/api/prices');
        },
        deletePrice: function (id) {
            return $http.delete(apiHost + '/api/prices?id=' + id)
        },
        get: function (id) {
            return $http.get(apiHost + '/api/prices?id=' + id)

        },
        post: function (price) {
            return $http.post(apiHost + '/api/prices', price)
        }
    };
    return serviceInstance;

}).factory('$Reports', function ($http) {
    var serviceInstance = {
        getPricesReport: function () {
            return $http.get(apiHost + '/api/reports/prices')
        }
    };
    return serviceInstance;
})
    .factory('$Sales', function ($http) {

    var serviceInstance = {

        counter: 0,

        priceSum: function (sale) {
            if (!sale || !sale.SaleDetails || sale.SaleDetails.length == 0) return 0

            return sale.SaleDetails.map(
                function (i) {
                    if (!i.Price || !i.Units) return 0
                    return i.Price * i.Units;
                }).reduce(function (i, n) {
                    return i + n;
                });
        },
        getSales: function () {
            return $http.get(apiHost + '/api/sales')
        },
        deleteSale: function (id) {
            return $http.delete(apiHost + '/api/sales?id=' + id)
        },
        updateSale: function (sale) {
            return $http.post(apiHost + '/api/sales', sale)
        },
        get: function (id) {
            return $http.get(apiHost + '/api/sales?id=' + id)

        }

    }

    return serviceInstance
})