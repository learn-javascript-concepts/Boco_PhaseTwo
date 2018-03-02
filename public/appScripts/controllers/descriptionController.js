define([], function() {
    var descriptionController = function($scope, workOrderCache, $timeout, $http, $cookies, $location, appConstants, authenticateUser, $sessionStorage) {

        var isCustomerIdModified = false;
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

        $scope.updateGoogleMaps = function() {
            if($scope.customer_details) {
                $scope.markerPosition = [cachedData.customer_details.address_latitude, cachedData.customer_details.address_longitude];
            }
        }

        $scope.updateGoogleMaps();

        $scope.formatTelephoneNumber = function() {

            if ($scope.customer_details.contact_number && $scope.customer_details.contact_number.toString().length > 9) {
                var telData = $scope.customer_details.contact_number.toString().replace(/-|x/g, '');
                var formattedTel = telData.substring(0, 3) + "-" + telData.substring(3, 6) + "-" + telData.substring(6, 10);
                $scope.customer_details.contact_number = formattedTel;
            }
            
        }

        $scope.formatTelephoneNumber();

        $scope.isInEditCustomerMode = false;

        $scope.editCustomerButton = function() {
            $scope.isInEditCustomerMode = true;
        };

        

        $scope.saveCustomerButton = function(isCustomerChanged = 0 ) {

            $scope.markerPosition = [49.74, -104.18];
            $scope.isInEditCustomerMode = false;

            var customerDetails = {
                company_name: $scope.customer_details.company_name,
                address: $scope.customer_details.address,
                email: $scope.customer_details.email,
                contact_number: $scope.customer_details.contact_number.replace(/-|x/g, ''),
                poc: $scope.customer_details.poc
            };

            if(cachedData.customer_details.id) {
                $http.put(appConstants.updateCustomerDetails + $scope.customer_details.id + "/", customerDetails, authenticateUser.getHeaderObject()).then(function(response) {
                    if(response.data.id) {
                        nj0$scope.updateGoogleMaps();
                        workOrderCache.updateCustomerDetails(response.data);
                        $scope.getAllCustomers();

                        if(isCustomerIdModified) {

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
                            alert("Customer Updated Successfully");
                        }
                    } else {
                        alert("Error Updating Customer Details")
                    }

                    isCustomerIdModified = false;
                })
            } else {
                $http.post(appConstants.addNewCustomer, customerDetails, authenticateUser.getHeaderObject()).then(function(response) {
                    if(response.data.id) {
                        $scope.updateGoogleMaps();
                        workOrderCache.updateCustomerDetails(response.data);
                        $scope.getAllCustomers();

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
                    isCustomerIdModified = false;
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
            $scope.allCustomerName = [];
            $http.get(appConstants.getAllCustomers, authenticateUser.getHeaderObject()).then(function(response) {
                for(let i=0; i < response.data.length; i++) {
                    $scope.allCustomerName.push(response.data[i].company_name);
                }
            })
        }

        $scope.getAllCustomers();

        $scope.searchCustomerName = "";

        $scope.searchCustomer = function() {
            if($scope.allCustomerName.indexOf($scope.searchCustomerName) > -1) {
                $http.get(appConstants.getSelectedCustomer + "company_name=" + $scope.searchCustomerName, authenticateUser.getHeaderObject()).then(function(response) {
                    $scope.customer_details = response.data[0];
                    workOrderCache.updateCustomerDetails(response.data[0]);
                    $scope.isInEditCustomerMode = true;
                    isCustomerIdModified = true;
                })
            } else {
                alert("No Customer with Specified Name Found")
            }
            
        };




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