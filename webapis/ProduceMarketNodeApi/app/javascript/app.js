/**
 * Created by taraskovtun on 5/11/15.
 */
var app = angular.module('produceMarketApp',['ngRoute']);

app.controller('PricesController', function($scope){
    $scope.text = 'text to show';
});


app.controller('PriceListCtrl', function($scope, $http){
    $scope.getPrices = function($http){
        $http.get('/api/prices').
            success(function(data, status, headers, config) {
                $scope.prices = data;
            }).
            error(function(data, status, headers, config) {
                var a = 10;
            });

    };
    $scope.getPrices($http);
});


app.controller('PriceDetailCtrl', function($scope){
    $scope.text = 'text to show';
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/prices', {
                templateUrl: '/views/pricesList.html',
                controller: 'PriceListCtrl'
            }).
            when('/prices/:phoneId', {
                templateUrl: '/views/priceDetail.html',
                controller: 'PriceDetailCtrl'
            }).
            otherwise({
                redirectTo: '/prices'
            });
    }]);