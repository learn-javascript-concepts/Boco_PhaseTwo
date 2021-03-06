define([], function(){

    function supplierController($scope, $http, appConstants, workOrderCache, authenticateUser, customerCache) {

        var cachedData = workOrderCache.getWorkOrderDetail();

        $scope.cost = "";
        $scope.ticket_number = "";
        $scope.company_name = "";

        $scope.supplierList = [];
        $scope.workOrderSupplierInfo = [];

        $scope.getWorkOrderSuppliers = function() {
            $http.get(appConstants.supplierApi + cachedData.id + "/suppliers/", authenticateUser.getHeaderObject()).then(function(response) {
                if(response.data.length) {
                    $scope.workOrderSupplierInfo = response.data;

                    for(i=0; i< $scope.workOrderSupplierInfo.length; i++) {
                        $scope.workOrderSupplierInfo[i].supplier = $scope.supplierList.filter((data) => data.id == $scope.workOrderSupplierInfo[i].supplier)[0];
                    }
                }
            })
        }

        $scope.getAllSuppliers = function() {
            $http.get(appConstants.getSupplierList, authenticateUser.getHeaderObject()).then(function(response) {
                if(response.data.length) {
                    $scope.supplierList = response.data;
                    $scope.getWorkOrderSuppliers();
                }
            })
        };

        $scope.supplierSortOrder = 0;
        $scope.supplierTicketSortOrder = 0;
        $scope.supplierCostSortOrder = 0;

        $scope.sortByField = function(fieldName) {
            if(fieldName == "company_name") {
                if($scope.supplierSortOrder == 0) {
                    $scope.supplierSortOrder = 1;
                } else if ($scope.supplierSortOrder == 1){
                    $scope.supplierSortOrder = -1;
                } else {
                    $scope.supplierSortOrder = 1;
                }

                $scope.sortData($scope.workOrderSupplierInfo, fieldName, $scope.supplierSortOrder, "String");

                $scope.supplierCostSortOrder = 0;
                $scope.supplierTicketSortOrder = 0;

            } else if(fieldName == "ticket_number") {
                if($scope.supplierTicketSortOrder == 0) {
                    $scope.supplierTicketSortOrder = 1;
                } else if($scope.supplierTicketSortOrder == 1){
                    $scope.supplierTicketSortOrder = -1;
                } else {
                    $scope.supplierTicketSortOrder = 1;
                }

                $scope.sortData($scope.workOrderSupplierInfo, fieldName, $scope.supplierTicketSortOrder);

                $scope.supplierSortOrder= 0;
                $scope.supplierCostSortOrder = 0;

            } else if(fieldName == "cost")  {
                if($scope.supplierCostSortOrder == 0) {
                    $scope.supplierCostSortOrder = 1;
                } else if($scope.supplierCostSortOrder == 1){
                    $scope.supplierCostSortOrder = -1;
                } else {
                    $scope.supplierCostSortOrder = 1;
                }

                $scope.sortData($scope.workOrderSupplierInfo, fieldName, $scope.supplierCostSortOrder);

                $scope.supplierSortOrder= 0;
                $scope.supplierTicketSortOrder = 0;
            }
        }

        $scope.sortData = function(array, fieldName, order, fieldType) {
            array = array.sort(function(a, b) {
                if(fieldType == "String") {
                    if(order == 1)  {
                        return a.supplier[fieldName] > b.supplier[fieldName];
                    } else return b.supplier[fieldName] > a.supplier[fieldName];
                } else {
                    if(order == 1)  {
                        return a.supplier[fieldName] - b.supplier[fieldName];
                    } else return b.supplier[fieldName] - a.supplier[fieldName];
                }                
            });
        }

        $scope.getAllSuppliers();
        
        $scope.addSupplierData = function() {

            // If Same data already Exists in the Grid, do Nothing

            if($scope.workOrderSupplierInfo.length > 0) {
                if($scope.workOrderSupplierInfo.filter((supplierObj) => $scope.compareAllObjects(supplierObj.supplier)).length > 0){
                    alert("Value Already Exists", "error");
                    return;
                }
            }

            var data = {
                company_name: $scope.company_name,
                workorder: workOrderCache.getWorkOrderDetail().id,
                ticket_number: $scope.ticket_number,
                cost: $scope.cost
            }

            var existingSupplierObject = [];

            if($scope.supplierList.length > 0) {
                existingSupplierObject =  $scope.supplierList.filter((supplierObj) => $scope.compareAllObjects(supplierObj));
            }

            if(existingSupplierObject.length > 0) {

                let addSupplierToWorkOrderData = {
                    "supplier": existingSupplierObject[0].id,
                    "workorder": workOrderCache.getWorkOrderDetail().id
                };

                $http.post(appConstants.supplierApi + cachedData.id + "/suppliers/", addSupplierToWorkOrderData, authenticateUser.getHeaderObject()).then(function(response){
                    $scope.getAllSuppliers();
                    $scope.clearData();
                    window.hideLoader();
                    alert("Supplier Details Added/Updated Successfully")
                }, function(response) {
                    $scope.clearData();
                    window.hideLoader();
                    alert(response.data, "error");
                });

                return;
            }

            $http.post(appConstants.addSupplier, data, authenticateUser.getHeaderObject()).then(function(response) {
                window.showLoader();
                var existingSupplierObject = [];
                if(response.status == 200 || response.status == 201) {
                    var supplierId = response.data.id;
                      
                    let addSupplierToWorkOrderData = {
                        "supplier": supplierId,
                        "workorder": workOrderCache.getWorkOrderDetail().id
                    };

                    $http.post(appConstants.supplierApi + cachedData.id + "/suppliers/", addSupplierToWorkOrderData, authenticateUser.getHeaderObject()).then(function(response){
                        $scope.getAllSuppliers();
                        $scope.clearData();
                        window.hideLoader();
                        alert("Supplier Details Added/Updated Successfully")
                    }, function(response) {
                        $scope.clearData();
                        window.hideLoader();
                        alert(response.data, "error");
                    });
                    
                }
            }, function(response) {
                $scope.clearData();
                window.hideLoader();
                alert(response.data, "error");
            })
        }

        $scope.removeSupplier = function(selectedSupplierId) {
            window.showLoader();
            $http.delete(appConstants.supplierApi + cachedData.id + "/suppliers/" + selectedSupplierId, authenticateUser.getHeaderObject()).then(function(response) {
                if(response.status == 200) {
                    window.hideLoader();
                    $scope.getSupplierList();
                    alert("Supplier Details Successfully Deleted.");
                }
            }, function(response) {
                $scope.clearData();
                window.hideLoader();
                alert(response.data, "error");
                
            })
        }

        $scope.clearData = function() {
            $scope.cost = "";
            $scope.ticket_number = "";
            $scope.company_name = "";
        }

        $scope.fillSupplierData = function(supplier) {
            if($scope.company_name.indexOf("-") > -1) {
                var data = $scope.company_name.split(" - ");
                var object = $scope.supplierList.filter((supplierInfo) => supplierInfo.company_name == data[0] && supplierInfo.ticket_number == data[1])[0]
                $scope.cost = parseInt(object.cost);
                $scope.ticket_number = parseInt(object.ticket_number);
                $scope.company_name = object.company_name;
            }
        }

        $scope.compareObjects = function(obj) {
            if(obj.company_name == $scope.company_name && $scope.ticket_number == obj.ticket_number) {
                return true;
            } else return false;
        }

        $scope.compareAllObjects = function(obj) {
            if(obj.company_name == $scope.company_name && $scope.ticket_number == obj.ticket_number && $scope.cost == obj.cost) {
                return true;
            } else return false;
        }

    }

    return supplierController;

});