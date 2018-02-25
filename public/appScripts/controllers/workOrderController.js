define([], function() {

    function workOrderController($scope, authenticateUser, $sessionStorage, $location, appConstants, $http, $location, $cookies, workOrderCache) {

        authenticateUser.redirectToLoginIfUnauthenticated();

        $scope.workOrderNumber = "";

        $scope.searchWorkOrder = function() {

            var configObject = {
                headers: {
                    "authToken": $cookies.get('authToken')
                }
            };
            
            $http.get(appConstants.getDetailedWorkorder + $scope.workOrderNumber, configObject).then(function(response) {
                var workOrderData = response.data;
                $sessionStorage.cachedWorkOrder = response.data;
                if(workOrderData) {
                    workOrderCache.saveWorkOrderDetails(workOrderData);

                    $location.path("description");                    
                } else {
                    alert("No Data exists for selected Work Order Number")
                }
            });

        }

        $scope.createWorkOrder = function() {
            $location.path("createworkorder");
        }

    }

    return workOrderController;
})