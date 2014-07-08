'use strict';

angular
  .module('bonitaPlatform', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'ListCtrl'
            })
            .when('/tenant/new', {
                templateUrl: 'views/create.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

