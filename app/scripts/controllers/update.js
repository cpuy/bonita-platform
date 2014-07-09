angular.module('bonitaPlatform')
    .controller('UpdateCtrl', function ($scope, $http, $location, $routeParams) {
        $scope.showValidationMessages = false;

        $http.get("/api/tenant/" + $routeParams.tenantId)
            .success(function (data) {
                $scope.tenant = data;
            });


        $scope.isInvalidPassword = function (pwd, conf_pwd) {

            return (pwd != conf_pwd) && $scope.showValidationMessages;
        }

        $scope.isNotValid = function (field) {
            return $scope.showValidationMessages && field.$invalid;
        }

        function isPasswordValid() {
            return $scope.tenant.password == $scope.tenant.confirm_password;
        };

        $scope.submit = function (tenant) {
            var state;
            $scope.showValidationMessages = true;
            $scope.form.$setDirty();
            if ($scope.form.$valid && isPasswordValid()) {
                $scope.showValidationMessages = false;

                if (tenant.activated) {
                    state = "ACTIVATED";
                } else {
                    state = "DEACTIVATED";
                }

                $http.put("/api/tenant/" + tenant.id, tenant)
                    .success(function (data) {
                        $location.path('/tenants');

                    });
            }
        };

        $scope.cancel = function () {
            $location.path('/tenants');
        };
    });
