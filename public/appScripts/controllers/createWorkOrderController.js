define([], function(){

    var createWorkOrderController = function($scope, $http, $cookies, authenticateUser, appConstants, workOrderCache, $location) {

        authenticateUser.redirectToLoginIfUnauthenticated();

        $scope.workOrderNumber = "";
        $scope.poNumber = "";
        $scope.workOrderBy = "";
        $scope.dateOfOrder = "";
        $scope.dateWorkStarted = "";

        var configObject = {
            headers: {
                "authToken": $cookies.get('authToken')
            }
        };

        $scope.getRandomWorkOrder = function() {
            $http.get(appConstants.getRandomWorkOrder, configObject).then(function(response) {
                $scope.workOrderNumber = response.data.randomWorkOrder;
            })
        }

        $scope.createWorkOrder = function() {

            var requestData = {
                "work_order_num": $scope.workOrderNumber,
                "customer_po_num": $scope.poNumber,
                "work_order_by": $scope.workOrderBy,
                "date_of_order": $scope.dateOfOrder,
                "date_work_started": $scope.dateWorkStarted
            };

            $http.post(appConstants.createWorkOrder, requestData, configObject).then(function(response) {
                workOrderCache.saveWorkOrderDetails(response.data);
                var responseData = response.data;
                $location.path("description");
            })
        }

        $scope.getRandomWorkOrder();

    }
    return createWorkOrderController;
});