angular.module('bonitaPlatform')
    .controller('ListCtrl', function ($scope) {
       $scope.tenants = [
           {"id":"1","creation":"2014-07-02 16:51:45.331","icon":"/default.png","username":"","description":"Default tenant","name":"default","state":"ACTIVATED","password":""},
           {"id":"2","creation":"2014-07-05 16:51:45.331","icon":"/default.png","username":"","description":"Coca cola","name":"coca","state":"ACTIVATED","password":""},
           {"id":"3","creation":"2014-07-08 16:51:45.331","icon":"/default.png","username":"","description":"Pepsi","name":"pepsi","state":"ACTIVATED","password":""}]
    });
