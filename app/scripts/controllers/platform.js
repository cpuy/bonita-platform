angular.module('bonitaPlatform')
    .controller('PlatformCtrl', function ($scope, $http) {
        $http.get("/api/platform")
            .success(function (data) {
                $scope.platform = data;
            });
    });
