var module = angular.module('ProduceMarketApp.directives', []);

module.directive('pricesList', function() {
    return {
        restrict: 'EAC',
        replace: true,
        templateUrl: 'app/prices.html '
    }
});

module.directive('googleSignin', function() {
    return {
        restrict: 'EAC',
        template: '<span id="signinButton">Google signin</span>', replace: true,
        scope: {
            afterSignin: '&'
        }
    } });
