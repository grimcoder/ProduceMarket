var app = angular.module('produceMarketApp',['ngRoute']);

app.controller('PricesController', function($scope){
    $scope.Title = 'Produce market';
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


app.controller('PriceDetailCtrl', function($scope, $routeParams, $http, $location){
    var isNew = false;
    $scope.new = function(){
        $scope.price = null;
    };
    $scope.save = function(){
        var isNew = !($scope.price && $scope.price.Id);

        $http.post('/api/prices', $scope.price).success(function(data, status, headers, config){
            $location.path('/');


        }).error(function(data, status, headers, config) {
                var a = 10;
            });

    };


    if ($routeParams.price){
        //$scope.price = $routeParams.price;

        $http.get('/api/prices/?id=' + $routeParams.price)
            .success(function(data, status, headers, config) {
                $scope.price = data[0];
            }).
            error(function(data, status, headers, config) {
                var a = 10;
            });
    }
    else{

    }
});

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