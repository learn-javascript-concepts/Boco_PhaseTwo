define([], function(){

    function equipmentController($scope, $http, appConstants, workOrderCache, authenticateUser, customerCache) {

        var cachedData = workOrderCache.getWorkOrderDetail();

        $scope.cost = "";
        $scope.item_name = "";

        $scope.itemList = null;
        $scope.workOrderItemListInfo = null;

        $scope.getAllEquipment = function() {
            $http.get(appConstants.getEquipmentList, authenticateUser.getHeaderObject()).then(function(response) {
                if(response.data.length) {
                    $scope.itemList = response.data;
                    $scope.getEquipmentList();
                }
            })
        };

        $scope.getEquipmentList = function() {
            $http.get(appConstants.equipmentApi + cachedData.id + "/equipments/", authenticateUser.getHeaderObject()).then(function(response) {
                if(response.data.length) {
                    $scope.workOrderItemListInfo = response.data;

                    for(i=0; i< $scope.workOrderItemListInfo.length; i++) {
                        $scope.workOrderItemListInfo[i].equipment = $scope.itemList.filter((data) => data.id == $scope.workOrderItemListInfo[i].equipment)[0];
                    }
                }
            })
        }

        $scope.getAllEquipment();
        
        $scope.addEquipmentData = function() {

            var data = {
                cost: $scope.cost,
                workorder: workOrderCache.getWorkOrderDetail().id,
                item_name: $scope.item_name
            }

            $http.post(appConstants.addEquipment, data, authenticateUser.getHeaderObject()).then(function(response) {
                if(response.status == 200 || response.status == 201) {
                    var equipmentId = response.data.id;

                    let addEquipmentToWorkOrderData = {
                        "supplier": equipmentId,
                        "workorder": workOrderCache.getWorkOrderDetail().id
                    };

                    $http.post(appConstants.equipmentApi + cachedData.id + "/equipments/", addEquipmentToWorkOrderData, authenticateUser.getHeaderObject()).then(function(response){
                        alert("Equipment Added Successfully")
                        $scope.getAllEquipment();
                    });
                }
            })
        }

        $scope.removeEquipment = function(selectedEquipment) {
            $http.delete(appConstants.equipmentApi + cachedData.id + "/equipments/" + selectedEquipment, authenticateUser.getHeaderObject()).then(function(response) {
                if(response.status == 200) {
                    alert("Equipment Successfully Deleted.")
                    $scope.getAllEquipment();
                }
            })
        }

    }

    return equipmentController;

});