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
            when('/sales', {
                templateUrl: '/views/salesList.html',
                controller: 'SalesCtrl'
            }).
            when('/sales/:sale', {
                templateUrl: '/views/saleDetail.html',
                controller: 'SalesCtrlDetail'
            }).
            when('/reports', {
                templateUrl: '/views/reports.html',
                controller: 'ReportsCtrl'
            }).
            otherwise({
                redirectTo: '/prices'
            });

    }]);