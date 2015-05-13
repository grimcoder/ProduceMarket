angular.module('produceMarketApp.services', []).factory('$Prices', function($http) {

    var serviceInstance = {

        counter: 0,


        getPrices: function(){
            return $http.get('/api/prices');
        },

        deletePrice : function(id){
            return $http.delete('/api/prices?id=' + id);
            },

        get: function(id){
           return $http.get('/api/prices/?id=' + id)

        },


        post: function(price)
        {
            return $http.post('/api/prices', price);
        }

    };

    return serviceInstance;

}).factory('$Sales', function($http) {

    var serviceInstance = {

        counter: 0,
        getSales: function(){
            return $http.get('/api/sales');
        },

        deleteSale : function(id){
            return $http.delete('/api/sales?id=' + id);
        }

            /*,
        get: function(id){
           return $http.get('/api/prices/?id=' + id)

        },
        post: function(price)
        {
            return $http.post('/api/prices', price);
        }
        */

    };

    return serviceInstance;
});