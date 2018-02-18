define([], function(){

    var createWorkOrderController = function($scope,authenticateUser, appConstants) {

        authenticateUser.redirectToLoginIfUnauthenticated();

        $scope.workOrderNumber = "";
        $scope.poNumber = "";
        $scope.workOrderBy = "";

        var requestData = {
            "work_order_num": $scope.workOrderNumber,
            "customer_po_num": $scope.poNumber,
            "work_order_by": $scope.workOrderBy
        }

        $scope.createWorkOrder = function() {
            $http.post(appConstants.createWorkOrder, requestData, function(response) {
                var responseData = response.data;
            })
        }

    }
    return createWorkOrderController;
});