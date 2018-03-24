define([], function(){

    function equipmentController($scope, $http, appConstants, workOrderCache, authenticateUser, customerCache) {

        var cachedData = workOrderCache.getWorkOrderDetail();

        $scope.cost = "";
        $scope.ticket_number = "";
        $scope.company_name = "";
        $sccope.date = "";

        $scope.supplierList = null;
        $scope.workOrderSupplierInfo = null;

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

        $scope.getAllSuppliers();
        
        $scope.addSupplierData = function() {

            var data = {
                company_name: $scope.company_name,
                workorder: workOrderCache.getWorkOrderDetail().id,
                ticket_number: $scope.ticket_number,
                cost: $scope.cost
            }

            $http.post(appConstants.addSupplier, data, authenticateUser.getHeaderObject()).then(function(response) {
                if(response.status == 200 || response.status == 201) {
                    var supplierId = response.data.id;

                    let addSupplierToWorkOrderData = {
                        "supplier": supplierId,
                        "workorder": workOrderCache.getWorkOrderDetail().id
                    };

                    $http.post(appConstants.supplierApi + cachedData.id + "/suppliers/", addSupplierToWorkOrderData, authenticateUser.getHeaderObject()).then(function(response){
                        alert("Supplier Details Added/Updated Successfully")
                        $scope.getAllSuppliers();
                    });
                }
            })
        }

        $scope.removeSupplier = function(selectedSupplierId) {
            $http.delete(appConstants.supplierApi + cachedData.id + "/suppliers/" + selectedSupplierId, authenticateUser.getHeaderObject()).then(function(response) {
                if(response.status == 200) {
                    alert("Supplier Details Successfully Deleted.")
                    $scope.getSupplierList();
                }
            })
        }

    }

    return supplierController;

});