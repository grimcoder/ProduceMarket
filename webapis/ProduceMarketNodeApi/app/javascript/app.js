var app = angular.module('produceMarketApp',['ngRoute', 'produceMarketApp.services']);


app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/prices', {
                templateUrl: '/views/pricesList.html',
                controller: 'PriceListCtrl'
            }).
            when('/prices/:price', {
                templateUrl: '/views/priceDetail.html',
                controller: 'PriceDetailCtrl'
            }).
            otherwise({
                redirectTo: '/prices'
            });
    }]);