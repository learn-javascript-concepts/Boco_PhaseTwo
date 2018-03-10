define([], function(){

    var createWorkOrderController = function($scope, $http, $cookies, authenticateUser, appConstants, workOrderCache, $location) {

        authenticateUser.redirectToLoginIfUnauthenticated();

        $scope.workOrderNumber = "";
        $scope.poNumber = "";
        $scope.workOrderBy = "";
        $scope.dateOfOrder = "";
        $scope.dateWorkStarted = "";

        $scope.getRandomWorkOrder = function() {
            $http.get(appConstants.getRandomWorkOrder, authenticateUser.getHeaderObject()).then(function(response) {
                $scope.workOrderNumber = response.data.work_order_number;
            })
        }

        $scope.createWorkOrder = function() {

            var requestData = {
                "work_order_num": $scope.workOrderNumber,
                "customer_po_num": $scope.poNumber,
                "work_order_by": $scope.workOrderBy,
                "date_of_order": new Date($scope.dateOfOrder),
                "date_work_started":  new Date($scope.dateWorkStarted)
            };

            $http.post(appConstants.createWorkOrder, requestData, authenticateUser.getHeaderObject()).then(function(response) {
                workOrderCache.saveWorkOrderDetails(response.data);
                var responseData = response.data;
                if(response.data.status == "CREATED") {
                    $location.path("description");
                } else {
                    alert("Error Creating Work Order")
                }
                
            })
        }

        $scope.getRandomWorkOrder();
    }
    return createWorkOrderController;
});