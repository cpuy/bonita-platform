angular.module('bonitaPlatform')
    .controller('ListCtrl', function ($scope, $http) {

        $http.get("/api/tenant")
            .success(function (data) {
                $scope.tenants = data;
            });

        $scope.isActivated = function (tenant) {
            return tenant.state == "ACTIVATED";
        }

        $scope.pause = function (tenant) {
            alert('paused');
            tenant.state = "DEACTIVATED";
        };

        $scope.resume = function (tenant) {
            alert('resumed');
            tenant.state = "ACTIVATED";
        }

        $scope.delete = function (tenant) {
            alert('not implemented yet');
        }

        $scope.edit = function (tenant) {
            alert('not implemented yet');
        }
    });
