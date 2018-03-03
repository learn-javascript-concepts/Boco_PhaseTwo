define([], function() {
    var descriptionController = function($scope, workOrderCache, $timeout, $http, $cookies, $location, appConstants, authenticateUser, $sessionStorage) {

        var isCustomerIdModified = false;
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

            $http.put(appConstants.saveDescription + cachedData.id + "/", descriptionData, authenticateUser.getHeaderObject()).then(function(response) {
                if(response.status == 200) {
                    workOrderCache.saveWorkOrderDetails(response.data);
                    alert("Customer Description Updated")
                } else {
                    alert("Error Updating Customer Description")
                }
            });
        };

        // Customer Screen

        $scope.customer_details = cachedData.customer_details;

        $scope.updateGoogleMaps = function() {
            if($scope.customer_details) {
                $scope.markerPosition = [$scope.customer_details.address_latitude, $scope.customer_details.address_longitude];
            }
        }


        $scope.updateGoogleMaps();

        $scope.formatTelephoneNumber = function() {

            if ($scope.customer_details && $scope.customer_details.contact_number && $scope.customer_details.contact_number.toString().length > 9) {
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
            var customerDetails = {
                company_name: $scope.customer_details.company_name,
                address: $scope.customer_details.address,
                email: $scope.customer_details.email,
                contact_number: $scope.customer_details.contact_number.toString().replace(/-|x/g, ''),
                poc: $scope.customer_details.poc
            };

            if(cachedData.customer_details.id) {
                $http.put(appConstants.updateCustomerDetails + $scope.customer_details.id + "/", customerDetails, authenticateUser.getHeaderObject()).then(function(response) {
                    $scope.isInEditCustomerMode = false;
                    if(response.data.id) {
                        workOrderCache.updateCustomerDetails(response.data);
                        $scope.customer_details = response.data;
                        $scope.allCustomers[$scope.searchCustomerNameFromListIndex(response.data.id)] = response.data;
                        $scope.updateGoogleMaps();

                        if(isCustomerIdModified) {

                            var addCustomerToWorkOrder = {
                                customer: response.data.id
                            }
                            
                            $http.put(appConstants.saveDescription + cachedData.id + "/", addCustomerToWorkOrder, authenticateUser.getHeaderObject()).then(function(response) {
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
                }, function() {
                    alert("Error Saving Data");
                })
            } else {
                $http.post(appConstants.addNewCustomer, customerDetails, authenticateUser.getHeaderObject()).then(function(response) {
                    $scope.isInEditCustomerMode = false;
                    if(response.data.id) {
                        $scope.allCustomers.push(response.data);
                        $scope.customer_details = response.data;
                        workOrderCache.updateCustomerDetails(response.data);
                        $scope.updateGoogleMaps();

                        var addCustomerToWorkOrder = {
                            customer: response.data.id
                        }

                        $http.put(appConstants.saveDescription + cachedData.id + "/", addCustomerToWorkOrder, authenticateUser.getHeaderObject()).then(function(response) {
                            if(response.status == 200) {
                                workOrderCache.saveWorkOrderDetails(response.data);
                                alert("Customer Added Successfully")
                            }
                        });
                    } else {
                        alert("Error Adding New Customer")
                    }
                    isCustomerIdModified = false;
                }, function() {
                    alert("Error Saving Data");
                })
            }
        };

        $scope.addCustomer = function() {
            $scope.customer_details = {};
            $scope.isInEditCustomerMode = true;
            cachedData.customer_details = {};
        }

        $scope.allCustomerName = [];
        $scope.allCustomers = [];

        $scope.searchCustomerNameFromListIndex = function(id) {
            for(let i=0; i < $scope.allCustomers.length; i++) {
                if($scope.allCustomers[i].id == id){
                    return i;
                }
            }
            return -1;
        }

        $scope.getAllCustomers = function() {
            $scope.allCustomerName = [];
            $scope.allCustomers = [];
            $http.get(appConstants.getAllCustomers, authenticateUser.getHeaderObject()).then(function(response) {
                $scope.allCustomers = response.data;
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
            $scope.searchCustomerName = "";
        };




        // Sub Contractor Screen


        $scope.sub_contractor_details = cachedData.sub_contractor_details;

        $scope.updateGoogleMapsForContractor = function() {
            if($scope.sub_contractor_details) {
                $scope.markerSubContractorPosition = [$scope.sub_contractor_details.address_latitude, $scope.sub_contractor_details.address_longitude];
            }
        }

        $scope.formatTelephoneNumberForContractor = function() {
            if ($scope.sub_contractor_details && $scope.sub_contractor_details.contact_number && $scope.sub_contractor_details.contact_number.toString().length > 9) {
                var telData = $scope.sub_contractor_details.contact_number.toString().replace(/-|x/g, '');
                var formattedTel = telData.substring(0, 3) + "-" + telData.substring(3, 6) + "-" + telData.substring(6, 10);
                $scope.sub_contractor_details.contact_number = formattedTel;
            }
        }

        $scope.searchSubContractor = function() {
            if($scope.allSubContractorName.indexOf($scope.searchSubContractorName) > -1) {
                $http.get(appConstants.getSelectedSubContractor + "sub_contractor_name=" + $scope.searchSubContractorName, authenticateUser.getHeaderObject()).then(function(response) {
                    $scope.sub_contractor_details = response.data[0];
                    workOrderCache.updateSubContractorDetails(response.data[0]);
                    $scope.isSubContractorInEditMode = true;
                    isSubContractorModified = true;
                })
            } else {
                alert("No Customer with Specified Name Found")
            }
            $scope.searchSubContractorName = "";
        };

        $scope.editSubContractorButton = function() {
            $scope.isSubContractorInEditMode = true;
        }

        $scope.allSubContractorName = [];
        $scope.allSubContractor = [];

        $scope.searchSubContractorNameFromListIndex = function(id) {
            for(let i=0; i < $scope.allSubContractor.length; i++) {
                if($scope.allSubContractor[i].id == id){
                    return i;
                }
            }
            return -1;
        }

        $scope.getAllSubContractors = function() {
            $scope.allSubContractorName = [];
            $scope.allSubContractor = [];
            $http.get(appConstants.getAllSubContractors, authenticateUser.getHeaderObject()).then(function(response) {
                $scope.allSubContractor = response.data;
                for(let i=0; i < response.data.length; i++) {
                    $scope.allSubContractorName.push(response.data[i].sub_contractor_name);
                }
            })
        }

        $scope.saveSubContractorButton = function() {
            var subContractorDetails = {
                sub_contractor_name: $scope.sub_contractor_details.sub_contractor_name,
                address: $scope.sub_contractor_details.address,
                email: $scope.sub_contractor_details.email,
                contact_number: $scope.sub_contractor_details.contact_number.toString().replace(/-|x/g, ''),
                poc: $scope.sub_contractor_details.poc
            };

            if(cachedData.sub_contractor_details.id) {
                $http.put(appConstants.updateSubContractorDetails + cachedData.sub_contractor_details.id + "/", subContractorDetails, authenticateUser.getHeaderObject()).then(function(response) {
                    $scope.isSubContractorInEditMode = false;
                    if(response.data.id) {
                        workOrderCache.updateSubContractorDetails(response.data);
                        $scope.allSubContractor[$scope.searchSubContractorNameFromListIndex(response.data.id)] = response.data;
                        $scope.sub_contractor_details = response.data;
                        $scope.updateGoogleMapsForContractor();

                        if(isSubContractorModified) {

                            var addSubContractorToWorkOrder = {
                                sub_contractor: response.data.id
                            }
                            
                            $http.put(appConstants.saveDescription + cachedData.id + "/", addSubContractorToWorkOrder, authenticateUser.getHeaderObject()).then(function(response) {
                                if(response.status == 200) {
                                    workOrderCache.saveWorkOrderDetails(response.data);
                                    alert("Customer Added Successfully")
                                }
                            });
                        } else {
                            alert("Sub Contractor Updated Successfully");
                        }
                    } else {
                        alert("Error Updating Sub Contractor Details")
                    }

                    isSubContractorModified = false;
                }, function() {
                    alert("Error Saving Data");
                })
            } else {
                $http.post(appConstants.addNewSubContractor, subContractorDetails, authenticateUser.getHeaderObject()).then(function(response) {
                    $scope.isSubContractorInEditMode = false;
                    if(response.data.id) {
                        $scope.allSubContractor.push(response.data);
                        $scope.sub_contractor_details = response.data;
                        workOrderCache.updateSubContractorDetails(response.data);
                        $scope.updateGoogleMapsForContractor();
                        var addSubContractorToWorkOrder = {
                            sub_contractor: response.data.id
                        }

                        $http.put(appConstants.saveDescription + cachedData.id + "/", addSubContractorToWorkOrder, authenticateUser.getHeaderObject()).then(function(response) {
                            if(response.status == 200) {
                                workOrderCache.saveWorkOrderDetails(response.data);
                                alert("Sub Contractor Added Successfully")
                            }
                        });
                    } else {
                        alert("Error Adding New Sub Contractor")
                    }
                    isSubContractorModified = false;
                }, function() {
                    alert("Error Saving Data");
                })
            }
        };

        $scope.addNewSubContractor = function() {
            $scope.sub_contractor_details = {};
            $scope.isSubContractorInEditMode = true;
            cachedData.sub_contractor_details = {};

        }

        $scope.initializePage = function() {
            if($scope.sub_contractor_details) {
                $scope.updateGoogleMapsForContractor();
                $scope.formatTelephoneNumberForContractor();
            }
            $scope.isSubContractorInEditMode = false;
            $scope.getAllSubContractors();
            $scope.searchSubContractorName = "";
        }

        $scope.initializePage();


    }
    return descriptionController;
});