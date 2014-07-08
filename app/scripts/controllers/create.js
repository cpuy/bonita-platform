angular.module('bonitaPlatform')
    .controller('CreateCtrl', function ($scope, $http, $location) {
        $scope.submit = function (tenant) {
            var state;
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

        $scope.cancel = function () {
            $location.path('/tenants');
        }
    });
