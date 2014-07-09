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

        $scope.isInvalidPassword = function(){
            return $scope.tenant.password != $scope.tenant.confirm_password;
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
