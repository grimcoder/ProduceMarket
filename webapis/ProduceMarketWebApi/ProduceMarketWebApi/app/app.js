var produceMarketApp = angular.module('ProduceMarketApp', ['ProduceMarketApp.directives', 'ProduceMarketApp.services']);
produceMarketApp.controller('MainController', function ($scope, $http) {
    $http.get('/api/prices').success(function (data, status) {
        this.data = data;
    });
});

produceMarketApp.controller('PricesController',
    ['$scope','$http', function ($scope, $http) {
        this.data = [1, 2, 3, 4].reverse();
        $http.get('/api/prices').success(function (data, status) {
            $scope.$apply(function($scope) {
                //this.data = data;

            });
        });
    }]
);
