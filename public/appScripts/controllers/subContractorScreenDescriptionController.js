define([], function(){

    var subContractorScreenDescriptionController = function($scope, workOrderCache, $http, $location, appConstants, authenticateUser) {

        var cachedData = workOrderCache.getWorkOrderDetail();

        var self = this;

        this.isSubContractorModified = false;
        
        $scope.sub_contractor_details = cachedData.sub_contractor_details;

        $scope.updateGoogleMapsForContractor = function() {
            if($scope.sub_contractor_details) {
                $scope.markerSubContractorPosition = [$scope.sub_contractor_details.address_latitude, $scope.sub_contractor_details.address_longitude];
            }
        }

        $scope.formatTelephoneNumberForContractor = function() {
            if ($scope.sub_contractor_details && $scope.sub_contractor_details.contact_number) {
                var telData = $scope.sub_contractor_details.contact_number.toString().replace(/-|x/g, '');
                var formattedTel = telData.substring(0, 3) + "-" + telData.substring(3, 6) + "-" + telData.substring(6, 10);
                $scope.sub_contractor_details.contact_number = formattedTel;
            }
        }

        $scope.searchSubContractor = function(showAlert = 0) {
            
            if($scope.searchSubContractorName != "") {
                if($scope.allSubContractorName.indexOf($scope.searchSubContractorName) > -1) {
                    $scope.sub_contractor_details = $scope.allSubContractor[$scope.searchSubContractorNameFromListIndex($scope.searchSubContractorName, true)];
                    cachedData.sub_contractor_details = $scope.sub_contractor_details;
                    workOrderCache.updateSubContractorDetails($scope.sub_contractor_details)
                    $scope.isSubContractorInEditMode = true;
                    self.isSubContractorModified = true;
                    $scope.searchSubContractorName = "";
                    $scope.markerSubContractorPosition = [$scope.sub_contractor_details.address_latitude, $scope.sub_contractor_details.address_longitude];
                    window.hideLoader();
                } else {
                    window.showLoader();
                    $http.get(appConstants.getSelectedSubContractor + "sub_contractor_name=" + $scope.searchSubContractorName, authenticateUser.getHeaderObject()).then(function(response) {
                        if(response.data[0]) {
                            $scope.sub_contractor_details = response.data[0];
                            cachedData.sub_contractor_details = response.data[0];
                            workOrderCache.updateSubContractorDetails(response.data[0]);
                            $scope.isSubContractorInEditMode = true;
                            self.isSubContractorModified = true;
                            $scope.searchSubContractorName = "";
                            $scope.markerSubContractorPosition = [$scope.sub_contractor_details.address_latitude, $scope.sub_contractor_details.address_longitude];
                        } else {
                            $scope.searchSubContractorName = "";
                            alert("No Such Sub Contractor Exists", "error");
                        }
                        window.hideLoader();
                    })
                }
            } else {
                $scope.searchSubContractorName = "";
                alert("Enter Sub Contractor Name to search", "error");
            }
        };

        $scope.editSubContractorButton = function() {
            $scope.isSubContractorInEditMode = true;
        }

        $scope.allSubContractorName = [];
        $scope.allSubContractor = [];

        $scope.searchSubContractorNameFromListIndex = function(id, searchByName = false) {
            for(let i=0; i < $scope.allSubContractor.length; i++) {
                if(searchByName) {
                    if($scope.allSubContractor[i].sub_contractor_name == id){
                        return i;
                    }
                } else {
                    
                    if($scope.allSubContractor[i].id == id){
                        return i;
                    }
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

            if(cachedData.sub_contractor_details == null) {
                cachedData.sub_contractor_details = {
                    company_name: "",
                    address: "",
                    email: "",
                    contact_number: "",
                    poc: ""
                }
            }

            window.showLoader();
            if(cachedData.sub_contractor_details.id) {
                $http.put(appConstants.updateSubContractorDetails + cachedData.sub_contractor_details.id + "/", subContractorDetails, authenticateUser.getHeaderObject()).then(function(response) {
                    $scope.isSubContractorInEditMode = false;
                    if(response.data.id) {
                        workOrderCache.updateSubContractorDetails(response.data);
                        $scope.allSubContractor[$scope.searchSubContractorNameFromListIndex(response.data.id)] = response.data;
                        $scope.sub_contractor_details = response.data;
                        $scope.formatTelephoneNumberForContractor()
                        $scope.updateGoogleMapsForContractor();

                        if(self.isSubContractorModified) {

                            var addSubContractorToWorkOrder = {
                                sub_contractor: response.data.id
                            }
                            
                            $http.put(appConstants.saveDescription + cachedData.id + "/", addSubContractorToWorkOrder, authenticateUser.getHeaderObject()).then(function(response) {
                                
                                window.hideLoader();
                                
                                if(response.status == 200) {
                                    workOrderCache.saveWorkOrderDetails(response.data);
                                    alert("Sub Contractor Details Added/Updated Successfully", "info")
                                }
                            });
                        } else {
                            window.hideLoader();
                            alert("Sub Contractor Details Added/Updated Successfully", "info");
                        }
                    } else {
                        window.hideLoader();
                        alert("Error Adding/Updating Sub Contractor Details", "error")
                    }

                    self.isSubContractorModified = false;
                }, function() {
                    window.hideLoader();
                })
            } else {
                $http.post(appConstants.addNewSubContractor, subContractorDetails, authenticateUser.getHeaderObject()).then(function(response) {
                    $scope.isSubContractorInEditMode = false;
                    if(response.data.id) {
                        $scope.allSubContractor.push(response.data);
                        $scope.sub_contractor_details = response.data;
                        $scope.formatTelephoneNumberForContractor();
                        workOrderCache.updateSubContractorDetails(response.data);
                        $scope.updateGoogleMapsForContractor();
                        var addSubContractorToWorkOrder = {
                            sub_contractor: response.data.id
                        }

                        $http.put(appConstants.saveDescription + cachedData.id + "/", addSubContractorToWorkOrder, authenticateUser.getHeaderObject()).then(function(response) {
                            
                            window.hideLoader();
                            
                            if(response.status == 200) {
                                workOrderCache.saveWorkOrderDetails(response.data);
                                alert("Sub Contractor Details Added/Updated Successfully")
                            }
                        });
                    } else {
                        window.hideLoader();
                        alert("Error Adding/Updating Sub Contractor Details", "error")
                    }
                    self.isSubContractorModified = false;
                }, function() {
                    window.hideLoader();
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
            $scope.getAllSubContractors();
            $scope.searchSubContractorName = "";
        }

        $scope.initializePage();

        $scope.isSubContractorInEditMode = true;

        if($scope.sub_contractor_details) {
            if($scope.sub_contractor_details.sub_contractor_name) {
                $scope.isSubContractorInEditMode = false;
            }
        }
    }
    
    return subContractorScreenDescriptionController;
})


        