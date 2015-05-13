
app.controller('PricesController', function($scope){
    $scope.Title = 'Produce market';



});

app.controller('PriceListCtrl', function($scope, $location, $Prices){
    $scope.getPrices = function(){
        //$Prices.counter++;
        $Prices.getPrices().success(function(data){
            $scope.prices = data;
        });
    };

    $scope.deletePrice = function(id){
        $Prices.deletePrice(id).
            success(function(data, status, headers, config) {
                $location.path("/");
            }).
            error(function(data, status, headers, config) {
            });
    };

    $scope.editPrice = function(id){
        $location.path("/prices/" + id);
    };

    $scope.newPrice = function(){
        $location.path('/prices/0');
    };

    $scope.getPrices();

});

app.controller('PriceDetailCtrl', function($scope, $routeParams, $location, $Prices){
    var isNew = false;
    $scope.new = function(){
        $scope.price = null;
    };

    $scope.save = function(){
        //$Prices.counter++;
        var isNew = !($scope.price && $scope.price.Id);
        $Prices.post($scope.price).success(function(data, status, headers, config){
            $location.path("/");
        })
    };

    if ($routeParams.price){
        $Prices.get($routeParams.price)
            .success(function(data) {
                $scope.price = data[0];
            }).
            error(function(data) {
                $scope.price = data[0];
            });
    }
    else{
        var a = 10;
    }
});

app.controller('SalesCtrlDetail',
    function($scope, $routeParams, $location, $Sales)
    {
        $scope.priceSum = function(sales){

            return sales.Sales.reduce(function(i,n){
                    var units = (i.Price ? i.Price * i.Units : i ) + n.Price * n.Units;
                    return units;
                }
            );
        }

        if ($routeParams.sale){
            $Sales.get($routeParams.sale)
                .success(function(data) {
                    $scope.sale = data[0];
                }).
                error(function(data) {
                    $scope.sale = data[0];
                });
        }
        else{
            var a = 10;
    }
}

);

app.controller('SalesCtrl',
    function($scope, $routeParams, $location, $Sales, $route)
    {
        $scope.getSales = function(){
            $Sales.getSales().success(function(data){
                $scope.sales = data;
            });
        };

        $scope.priceSum = function(sales){
            return sales.Sales.reduce(function(i,n){
                    var units = (i.Price ? i.Price * i.Units : i ) + n.Price * n.Units;
                    return units;
                }
            );
        }

        $scope.editSale = function(id){
            $location.path("/sales/" + id);
        };

        $scope.deleteSale = function(id){
            $Sales.deleteSale(id).success(function(data){
                $route.reload();
            });
        };

        $scope.getSales();
    }
);