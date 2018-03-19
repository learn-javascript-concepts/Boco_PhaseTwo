define([], function(){

    function supplierController($scope, $http, appConstants, workOrderCache, authenticateUser, customerCache) {

        window.showLoader();

        var cachedData = workOrderCache.getWorkOrderDetail();

        $scope.cost = "";
        $scope.ticket_number = "";

        $scope.company_name = "";

        $scope.supplierList = null;

        $scope.getSupplierList = function() {
            $http.get(appConstants.getAllSupplier + cachedData.id + "/suppliers/", authenticateUser.getHeaderObject()).then(function(response) {
                if(response.data.length) {
                    $scope.supplierList = response.data;
                    window.hideLoader();
                }
            })
        }

        $scope.getSupplierList();
        
        this.addSupplierData = function() {
            window.showLoader();

            var data = {
                company_name: $scope.company_name,
                workorder: workOrderCache.getWorkOrderDetail().id,
                ticket_number: $scope.ticket_number,
                cost: $scope.cost
            }
            
            $http.post(appConstants.supplierApi + cachedData.id + "/suppliers/", data, authenticateUser.getHeaderObject()).then(function(response) {
                if(response.status == 200) {
                    alert("Supplier Details Added/Updated Successfully")
                    $scope.getSupplierList();
                }
                
                window.hideLoader();
            })
        }

        

    }

    return supplierController;

});