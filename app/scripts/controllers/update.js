angular.module('bonitaPlatform')
    .controller('UpdateCtrl', function ($scope, $http, $location, $routeParams) {
        $scope.showValidationMessages = false;

        $http.get("/bonita/API/platform/tenant/"+$routeParams.tenantId)
            .success(function (data) {
                $scope.tenant = data;
            })
            .error(
                function (data) {
                    $scope.tenant = {
                        "defaultTenant" : true,
                        "description" : "Default tenant",
                        "id" : 1,
                        "state" : "ACTIVATED"
                    } ;
                }
            );

        $scope.isInvalidPassword = function(pwd,conf_pwd){

            return (pwd != conf_pwd) && $scope.showValidationMessages;
        }

        $scope.isNotValid = function(field){
            return $scope.showValidationMessages && field.$invalid;
        }

        $scope.submit =  function(tenant) {
           var state;
           $scope.showValidationMessages = true;
           $scope.form.$setDirty();
           if($scope.form.$valid) {
               $scope.showValidationMessages = false;

               if (tenant.activated) {
                   state = "ACTIVATED";
               } else {
                   state = "DEACTIVATED";
               }

               $http.post("/bonita/API/platform/tenant", {"name": tenant.name, "username": tenant.username, "password": tenant.password, "description": tenant.description, "icon": "/default.png", "state": state})
                   .success(function (data) {
                       $location.path('/tenants');

                   });
           }
       };

        $scope.cancel = function () {
            $location.path('/tenants');
        };
    });
