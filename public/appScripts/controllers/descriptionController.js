define([], function() {
    var descriptionController = function($scope, workOrderCache, $http, $cookies, $location, appConstants, authenticateUser, $sessionStorage) {

        authenticateUser.redirectToLoginIfUnauthenticated();

        var cachedData = workOrderCache.getWorkOrderDetail();

        $scope.work_order_num = cachedData.work_order_num;
        $scope.customer_po_num = cachedData.customer_po_num;
        $scope.work_order_by = cachedData.work_order_by;
        $scope.date_work_started = new Date(cachedData.date_work_started);
        $scope.date_of_order = new Date(cachedData.date_of_order);
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

            var descriptionData = {
                work_order_num: $scope.work_order_num,
                description: $scope.description,
                other_requirements: $scope.other_requirements
            }

            $http.put(appConstants.saveDescription + cachedData.id, descriptionData, authenticateUser.getHeaderObject()).then(function(response) {
                if(response.data.status == "CREATED") {
                    workOrderCache.saveWorkOrderDetails(response.data);
                }
            });
        };




        // Customer Screen

        $scope.customer_details = cachedData.customer_details;

        $scope.isInEditCustomerMode = false;

        $scope.editCustomerButton = function() {
            $scope.isInEditCustomerMode = true;
        };

        $scope.saveCustomerButton = function() {
            $scope.isInEditCustomerMode = false;

            var customerDetails = {
                company_name: $scope.customer_details.company_name,
                address: $scope.customer_details.address,
                email: $scope.customer_details.email,
                contact_number: $scope.customer_details.contact_number,
                poc: $scope.customer_details.poc
            };

            if(cachedData.customer_details.id) {
                $http.put(appConstants.updateCustomerDetails + $scope.customer_details.id + "/", customerDetails, authenticateUser.getHeaderObject()).then(function(response) {
                    if(response.data.id) {
                        workOrderCache.saveWorkOrderDetails.customer_details = response.data;
                        alert("Customer Updated Successfully")
                    } else {
                        alert("Error Updating Customer Details")
                    }
                    
                    alert(data.success);
                })
            } else {
                $http.post(appConstants.addNewCustomer, customerDetails, authenticateUser.getHeaderObject()).then(function(response) {
                    if(response.data.id) {
                        workOrderCache.saveWorkOrderDetails.customer_details = response.data;

                        var addCustomerToWorkOrder = {
                            customer: response.data.id
                        }

                        $http.put(appConstants.saveDescription + cachedData.id, addCustomerToWorkOrder, authenticateUser.getHeaderObject()).then(function(response) {
                            if(response.status == 200) {
                                workOrderCache.saveWorkOrderDetails(response.data);
                                alert("Customer Added Successfully")
                            }
                        });

                        
                    } else {
                        alert("Error Adding New Customer")
                    }
                })
            }
        };

        $scope.addCustomer = function() {
            $scope.customer_details = {};
            $scope.isInEditCustomerMode = true;
            cachedData.customer_details = {};
        }

        $scope.workOrderList = [];

        $scope.allCustomerName = [];

        $scope.getAllCustomers = function() {
            $http.get(appConstants.getAllCustomers, authenticateUser.getHeaderObject()).then(function(response) {
                for(let i=0; i < response.data.length; i++) {
                    $scope.allCustomerName.push(response.data[i].company_name);
                }
            })
        }

        $scope.getAllCustomers();

        $scope.searchCustomerName = "";

        $scope.searchCustomer = function() {
            $http.get(appConstants.getSelectedCustomer + "1", authenticateUser.getHeaderObject()).then(function(response) {
                $scope.customer_details = response.data.customerDetails;
                cachedData.customer_details = response.data.customerDetails;
                workOrderCache.updateCustomerDetails(cachedData.customer_details);
            })
        }




        // Sub Contractor Screen

        $scope.sub_contractor_details = cachedData.sub_contractor_details;

        $scope.isSubContractorInEditMode = false;

        $scope.editSubContractorButton = function() {
            $scope.isSubContractorInEditMode = true;
        }

        $scope.saveSubContractorButton = function() {
            $scope.isSubContractorInEditMode = false;

            var subContractorDetails = {
                sub_contractor_name: $scope.sub_contractor_details.sub_contractor_name,
                address: $scope.sub_contractor_details.address,
                email: $scope.sub_contractor_details.email,
                contact_number: $scope.sub_contractor_details.contact_number,
                poc: $scope.sub_contractor_details.poc
            };

            if(cachedData.sub_contractor_details.id) {
                $http.post(appConstants.updateCustomerDetails, customerDetails, authenticateUser.getHeaderObject()).then(function(response) {
                    if(response.data.id) {
                        workOrderCache.saveWorkOrderDetails.sub_contractor_details = response.data;
                        alert("Sub Contractor Updated Successfully");
                    } else {
                        alert("Error Updating Customer Details");
                    }
                    
                    alert(data.success);
                })
            } else {
                $http.post(appConstants.addNewCustomer, customerDetails, authenticateUser.getHeaderObject()).then(function(response) {
                    if(response.data.id) {
                        workOrderCache.saveWorkOrderDetails.sub_contractor_details = response.data;
                        alert("Sub Contractor Added Successfully");
                    } else {
                        alert("Error Adding New Customer")
                        
                    }
                })
            }
        };

        $scope.addNewSubContractor = function() {
            $scope.sub_contractor_details = {};
            $scope.isSubContractorInEditMode = true;
            cachedData.sub_contractor_details = {};

        }
    }
    return descriptionController;
});