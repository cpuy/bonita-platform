'use strict';

angular
  .module('bonitaPlatform', ['ngRoute', 'ui.bootstrap'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/tenants', {
                templateUrl: 'views/list.html',
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

