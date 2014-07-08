angular.module('bonitaPlatform')
    .controller('ListCtrl', function ($scope, $http, $modal) {

        $http.get("/api/tenant")
            .success(function (data) {
                $scope.tenants = data;
            });

        $scope.isActivated = function (tenant) {
            return tenant.state == "ACTIVATED";
        }

        function openModal(tenant, message) {
            return $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    message: function () {
                        return message;
                    },
                    tenant: function() {
                        return tenant;
                    }
                }
            });
        };

        $scope.pause = function (tenant) {
            var modal = openModal(tenant, "Are you sure you want to pause tenant '" + tenant.name + "' ?");

            modal.result.then(function (tenant) {
                tenant.state = "DEACTIVATED";
            });
        };

        $scope.resume = function (tenant) {
            var modal = openModal(tenant, "Are you sure you want to resume tenant '" + tenant.name + "' ?");

            modal.result.then(function (tenant) {
                tenant.state = "ACTIVATED";
            });
        }

        $scope.delete = function (tenant) {
            var modal = openModal(tenant, "Are you sure you want to delete tenant '" + tenant.name + "' ?");

            modal.result.then(function (tenant) {
                alert('not yet implemented');
            });
        }

        $scope.edit = function (tenant) {
            alert('not implemented yet');
        }
    })
    .controller('ModalInstanceCtrl', function($scope, $modalInstance, message, tenant) {
        $scope.message = message;
        $scope.ok = function () {
            $modalInstance.close(tenant);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
