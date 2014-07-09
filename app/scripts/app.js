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
            .when('/tenants/:tenantId', {
                templateUrl: 'views/update.html',
                controller: 'UpdateCtrl'
            })
            .otherwise({
                redirectTo: '/tenants'
            });
    });

