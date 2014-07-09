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
                        "iconPath" : null,
                        "iconName" : null,
                        "description" : "Default tenant",
                        "creationDate" : "2014-07-08T10:21:36.025+0000",
                        "name" : "default",
                        "id" : 1,
                        "state" : "ACTIVATED"
                    } ;
                }
            );

        $scope.isInvalidPassword = function(field){
            return $scope.form.password == $scope.form.confirm_password;
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
