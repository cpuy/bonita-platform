'use strict';

angular
  .module('bonitaPlatform', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/tenants', {
                templateUrl: 'views/main.html',
                controller: 'ListCtrl'
            })
            .when('/tenants/new', {
                templateUrl: 'views/create.html',
                controller: 'CreateCtrl'
            })
            .otherwise({
                redirectTo: '/tenants'
            });
    });

