define([], function() {
    var descriptionController = function($scope, workOrderCache, $http, $cookies, $location, appConstants, authenticateUser, $sessionStorage) {

        authenticateUser.redirectToLoginIfUnauthenticated();

        var cachedData = workOrderCache.getWorkOrderDetail();
        $scope.work_order_num = cachedData.work_order_num;
        $scope.customer_po_num = cachedData.customer_po_num;
        $scope.work_order_by = cachedData.work_order_by;
        $scope.date_work_started = new Date(cachedData.date_work_started);
        $scope.created = new Date(cachedData.created);
        $scope.description = cachedData.description;
        $scope.other_requirements = cachedData.other_requirements;
        $scope.isInNonEditModeOfDescription = true;

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
            $scope.isInNonEditModeOfDescription = true;

            var configObject = {
                headers: {
                    "authToken": $cookies.get('authToken')
                }
            };

            var descriptionData = {
                work_order_num: $scope.work_order_num,
                description: $scope.description,
                other_requirements: $scope.other_requirements
            }

            $http.post(appConstants.saveDescription, descriptionData, configObject).then(function(response) {
                if(response.data.success == true) {
                    alert("Data Saved");
                }
            })
        };




        // Customer Screen

        $scope.customer_details = cachedData.customer_details;

        $scope.isInEditCustomerMode = false;

        $scope.editCustomerButton = function() {
            $scope.isInEditCustomerMode = true;
        };

        $scope.saveCustomerButton = function() {
            $scope.isInEditCustomerMode = false;
        };

        $scope.addCustomer = function() {

        }




        // Sub Contractor Screen

        $scope.sub_contractor_details = cachedData.sub_contractor_details;

        $scope.isSubContractorInEditMode = false;

        $scope.editSubContractorButton = function() {
            $scope.isSubContractorInEditMode = true;
        }

        $scope.saveSubContractorButton = function() {
            $scope.isSubContractorInEditMode = false;
        }

        $scope.addSubContractor = function() {

        }
    }
    return descriptionController;
});