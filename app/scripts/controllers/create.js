angular.module('bonitaPlatform')
    .controller('CreateCtrl', function ($scope, $http, $location) {
        $scope.showValidationMessages = false;

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
