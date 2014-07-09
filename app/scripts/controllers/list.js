angular.module('bonitaPlatform')
    .controller('ListCtrl', function ($scope, $http, $modal, $location) {

        function load() {
            $http.get("/api/tenant")
                .success(function (data) {
                    $scope.tenants = data;
                });
        }
        load();


        $scope.isActivated = function (tenant) {
            return tenant.state == "ACTIVATED";
        };

        $scope.isPaused = function (tenant) {
            return tenant.state == "PAUSED";
        };

        $scope.isDeactivated = function (tenant) {
            return tenant.state == "DEACTIVATED";
        };

        $scope.getStateClass = function(state) {
            switch(state) {
                case 'ACTIVATED':
                    return 'label-success';
                case 'DEACTIVATED':
                    return 'label-danger';
                case 'PAUSED':
                    return 'label-warning';
                default:
                    return 'label-default';
            }
        };

        function openModal(tenant, message, buttonOk) {
            return $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    message: function () {
                        return message;
                    },
                    tenant: function () {
                        return tenant;
                    },
                    buttonOk: function () {
                        return buttonOk;
                    }
                }
            });
        };

        function openAlertModal(tenant, message) {
            return $modal.open({
                templateUrl: 'myModalAlertContent.html',
                controller: 'ModalAlertInstanceCtrl',
                resolve: {
                    message: function () {
                        return message;
                    }
                }
            });
        };

        $scope.pause = function (tenant) {
            var modal = openModal(tenant, "Are you sure you want to pause tenant '" + tenant.name + "' ?", "Pause");

            modal.result.then(function (tenant) {
                $http.put("/bonita/API/system/tenant/" + tenant.id, {paused: "true"})
                    .success(function (data) {
                        load();
                    });
            });
        };

        $scope.activate = function(tenant) {
            var modal = openModal(tenant, "Are you sure you want to activate tenant '" + tenant.name + "' ?", "Activate");

            modal.result.then(function (tenant) {
                $http.put("/api/tenant/" + tenant.id, {state: "activated"})
                    .success(function (data) {
                        load();
                    });
            });
        };

        $scope.deactivate = function(tenant) {
            var modal = openModal(tenant, "Are you sure you want to deactivate tenant '" + tenant.name + "' ?", "Deactivate");

            modal.result.then(function (tenant) {
                $http.put("/api/tenant/" + tenant.id, {state: "deactivated"})
                    .success(function (data) {
                        load();
                    });
            });
        };

        $scope.resume = function (tenant) {
            var modal = openModal(tenant, "Are you sure you want to resume tenant '" + tenant.name + "' ?", 'Resume');

            modal.result.then(function (tenant) {
                $http.put("/bonita/API/system/tenant/" + tenant.id, {paused: "false"})
                    .success(function (data) {
                        load();
                    });
            });
        }

        $scope.delete = function (tenant) {

            if ($scope.isDeactivated(tenant)) {
                var modal = openModal(tenant, "Are you sure you want to delete tenant '" + tenant.name + "' ?", 'Delete');

                modal.result.then(function (tenant) {
                    $http.delete("/api/tenant/" + tenant.id)
                        .success(function (data) {
                            load();
                        });
                });
            } else {
                openAlertModal(tenant, "You cannot delete an activated tenant, please deactivate it before deleting", 'OK');
            }
        }

        $scope.edit = function (tenant) {
            $location.path('/tenants/' + tenant.id);
        }
    })
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, message, tenant, buttonOk) {
        $scope.message = message;
        $scope.button = buttonOk;
        $scope.ok = function () {
            $modalInstance.close(tenant);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('ModalAlertInstanceCtrl', function ($scope, $modalInstance, message) {
        $scope.message = message;

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });;
