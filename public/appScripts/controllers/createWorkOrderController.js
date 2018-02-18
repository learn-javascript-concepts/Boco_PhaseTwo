define([], function(){

    var createWorkOrderController = function($scope, $http, authenticateUser, appConstants, workOrderCache, $location) {

        authenticateUser.redirectToLoginIfUnauthenticated();

        $scope.workOrderNumber = "";
        $scope.poNumber = "";
        $scope.workOrderBy = "";
        $scope.dateOfOrder = "";
        $scope.dateWorkStarted = "";

        $scope.createWorkOrder = function() {

            var requestData = {
                "work_order_num": $scope.workOrderNumber,
                "customer_po_num": $scope.poNumber,
                "work_order_by": $scope.workOrderBy,
                "date_of_order": $scope.dateOfOrder,
                "date_work_started": $scope.dateWorkStarted
            }

            $http.post(appConstants.createWorkOrder, requestData).then(function(response) {
                workOrderCache.saveWorkOrderDetails(response.data);
                var responseData = response.data;
                $location.path("description");
            })
        }

    }
    return createWorkOrderController;
});