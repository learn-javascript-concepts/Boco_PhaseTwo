define([], function() {
    var descriptionController = function($scope, workOrderCache, $timeout, $http, $cookies, $location, appConstants, authenticateUser, $sessionStorage) {
        
        $scope.markerSubContractorPosition = [38.46583480, -91.02618380];
        
        var isSubContractorModified = false;
        authenticateUser.redirectToLoginIfUnauthenticated();

        var cachedData = workOrderCache.getWorkOrderDetail();

        $scope.googleMapsUrl = "AIzaSyAog2mjYSr6LJ2nMkQ2mOO7H4mrzizFqmY";


        $scope.work_order_num = cachedData.work_order_num;
        $scope.customer_po_num = cachedData.customer_po_num;
        $scope.work_order_by = cachedData.work_order_by;
        $scope.date_work_started = new Date(cachedData.date_work_started).toLocaleDateString("en-US");
        $scope.date_of_order = new Date(cachedData.date_of_order).toLocaleDateString("en-US");
        $scope.description = cachedData.description;
        $scope.other_requirements = cachedData.other_requirements;

        if($scope.description != "") {
            $scope.isInNonEditModeOfDescription = true;
        } else {
            $scope.isInNonEditModeOfDescription = false;
        }
        

        $scope.logoutUser = function() {
            authenticateUser.clearAuthenticationToken();
            workOrderCache.clearCachedWorkOrder();
            $sessionStorage.$reset();
            $location.path("/");
        }

        $scope.editDescriptionButton = function() {
            $scope.isInNonEditModeOfDescription = false;
        };

        $scope.saveDescriptionButton = function() {

            window.showLoader();

            $scope.isInNonEditModeOfDescription = true;

            var descriptionData = {
                work_order_num: $scope.work_order_num,
                description: $scope.description,
                other_requirements: $scope.other_requirements
            }

            $http.put(appConstants.saveDescription + cachedData.id + "/", descriptionData, authenticateUser.getHeaderObject()).then(function(response) {
                window.hideLoader();
                if(response.status == 200) {
                    workOrderCache.saveWorkOrderDetails(response.data);
                    alert("Workorder Description Updated Successfully", "info")
                } else {
                    alert("Error Updating Workorder Description", "error")
                }
            });
        };
    }
    return descriptionController;
});