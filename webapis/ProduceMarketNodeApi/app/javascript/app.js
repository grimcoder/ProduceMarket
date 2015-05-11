/**
 * Created by taraskovtun on 5/11/15.
 */
var app = angular.module('produceMarketApp',['ngRoute']);

app.controller('PricesController', function($scope){
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