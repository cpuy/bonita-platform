angular.module('bonitaPlatform')
    .controller('CreateCtrl', function ($scope, $http, $location) {
        $scope.showValidationMessages = false;

        $scope.isNotValid = function(field){
            return $scope.showValidationMessages && field.$invalid;
        }

        $scope.isInvalidPassword = function(pwd,conf_pwd){
            return (pwd != conf_pwd) && $scope.showValidationMessages;
        }

        $scope.submit =  function(tenant) {
           var state;
           $scope.showValidationMessages = true;
           $scope.form.$setDirty();
           if($scope.form.$valid) {
               $scope.showValidationMessages = false;



               $http.post("/bonita/API/platform/tenant", tenant)
                   .success(function (data) {
                       if (tenant.activated) {
                           activate(data);
                       } else {
                           $location.path('/tenants');
                       }


                   });

           }
       };

        function activate(tenant) {
            $http.put("/api/tenant/" + tenant.id, {state: "activated"})
                .success(function (data) {
                    $location.path('/tenants');
                });
        }

        $scope.cancel = function () {
            $location.path('/tenants');
        };
    });
