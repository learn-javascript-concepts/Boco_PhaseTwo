define([], function(){

    function stockController($scope, $http, appConstants, workOrderCache, authenticateUser, customerCache) {

        var cachedData = workOrderCache.getWorkOrderDetail();

        $scope.cost = "";
        $scope.stock_type = "MECHANICAL";
        $scope.item_name = "";
        $scope.number_of_items = "";

        $scope.stockList = [];
        $scope.workOrderStockInfo = [];

        $scope.itemSortOrder = 0;
        $scope.typeSortOrder = 0;
        $scope.numberSortOrder = 0;
        $scope.costSortOrder = 0;

        $scope.sortByField = function(fieldName) {
            if(fieldName == "item_name") {
                if($scope.itemSortOrder == 0) {
                    $scope.itemSortOrder = 1;
                } else if ($scope.itemSortOrder == 1){
                    $scope.itemSortOrder = -1;
                } else {
                    $scope.itemSortOrder = 1;
                }

                $scope.sortData($scope.workOrderStockInfo, fieldName, $scope.itemSortOrder, "String");

                $scope.supplierCostSortOrder = 0;
                $scope.typeSortOrder = 0;
                $scope.numberSortOrder = 0;

            } else if(fieldName == "stock_type") {
                if($scope.typeSortOrder == 0) {
                    $scope.typeSortOrder = 1;
                } else if($scope.typeSortOrder == 1){
                    $scope.typeSortOrder = -1;
                } else {
                    $scope.typeSortOrder = 1;
                }

                $scope.sortData($scope.workOrderStockInfo, fieldName, $scope.typeSortOrder, "String");

                $scope.itemSortOrder= 0;
                $scope.supplierCostSortOrder = 0;
                $scope.numberSortOrder = 0;

            } else if(fieldName == "cost")  {
                if($scope.costSortOrder == 0) {
                    $scope.costSortOrder = 1;
                } else if($scope.costSortOrder == 1){
                    $scope.costSortOrder = -1;
                } else {
                    $scope.costSortOrder = 1;
                }

                $scope.sortData($scope.workOrderStockInfo, fieldName, $scope.costSortOrder);

                $scope.itemSortOrder= 0;
                $scope.typeSortOrder = 0;
                $scope.numberSortOrder = 0;

            } else if(fieldName == "number_of_items")  {
                if($scope.numberSortOrder == 0) {
                    $scope.numberSortOrder = 1;
                } else if($scope.numberSortOrder == 1){
                    $scope.numberSortOrder = -1;
                } else {
                    $scope.numberSortOrder = 1;
                }

                $scope.sortData($scope.workOrderStockInfo, fieldName, $scope.numberSortOrder);

                $scope.itemSortOrder= 0;
                $scope.typeSortOrder = 0;
                $scope.costSortOrder = 0;
            }
        }

        $scope.getWorkOrderStocks = function() {
            $http.get(appConstants.stockApi + cachedData.id + "/stocks/", authenticateUser.getHeaderObject()).then(function(response) {
                if(response.data.length) {
                    $scope.workOrderStockInfo = response.data;

                    for(i=0; i< $scope.workOrderStockInfo.length; i++) {
                        $scope.workOrderStockInfo[i].stocks = $scope.stockList.filter((data) => data.id == $scope.workOrderStockInfo[i].stocks)[0];
                    }
                }
            }, function() {
                alert("No Data Available");
            })
        }

        $scope.getAllStocks = function() {
            $http.get(appConstants.getStockList, authenticateUser.getHeaderObject()).then(function(response) {
                if(response.data.length) {
                    $scope.stockList = response.data;
                    $scope.getWorkOrderStocks();
                }
            }, function() {
                alert("Error Loading List of Available Stocks");
            })
        };

        $scope.getAllStocks();

       

        $scope.sortData = function(array, fieldName, order, fieldType) {
            array = array.sort(function(a, b) {
                if(fieldType == "String") {
                    if(order == 1)  {
                        return a.stocks[fieldName] > b.stocks[fieldName];
                    } else return b.stocks[fieldName] > a.stocks[fieldName];
                } else {
                    if(order == 1)  {
                        return a.stocks[fieldName] - b.stocks[fieldName];
                    } else return b.stocks[fieldName] - a.stocks[fieldName];
                }                
            });
        }

        $scope.getAllStocks();
        
        $scope.addStockData = function() {
            if($scope.workOrderStockInfo.length > 0) {
                if($scope.workOrderStockInfo.filter((stockObj) => $scope.compareAllObjects(stockObj)).length > 0){
                    alert("Value Already Exists", "error");
                    return;
                }
            }
            
            var data = {
                cost: $scope.cost,
                workorder: workOrderCache.getWorkOrderDetail().id,
                stock_type: $scope.stock_type,
                number_of_items: $scope.number_of_items,
                item_name: $scope.item_name
            }

            var existingStockObject = [];

            if($scope.workOrderStockInfo.length > 0) {
                existingStockObject =  $scope.stockList.filter((stockObj) => $scope.compareObjects(stockObj));
            }
            
            if(existingStockObject.length == 0) {
                
                let addStockToWorkOrderData = {
                    "stocks": stockId,
                    "workorder": workOrderCache.getWorkOrderDetail().id
                };

                $http.post(appConstants.stockApi + cachedData.id + "/stocks/", addStockToWorkOrderData, authenticateUser.getHeaderObject()).then(function(response){
                    $scope.getAllStocks();
                    $scope.clearData();
                    window.hideLoader();
                    alert("Stock Details Added/Updated Successfully")
                }, function(response) {
                    $scope.clearData();
                    window.hideLoader();
                    alert(response.data, "error");
                });

                return;
            } 

            $http.post(appConstants.addStock, data, authenticateUser.getHeaderObject()).then(function(response) {
                window.showLoader();
                if(response.status == 200 || response.status == 201) {
                    var stockId = response.data.id;
                    var existingStockObject = [];

                    if($scope.workOrderStockInfo.length > 0) {
                        existingStockObject =  $scope.stockList.filter((stockObj) => $scope.compareObjects(stockObj));
                    }

                    let addStockToWorkOrderData = {
                        "stocks": stockId,
                        "workorder": workOrderCache.getWorkOrderDetail().id
                    };

                    $http.post(appConstants.stockApi + cachedData.id + "/stocks/", addStockToWorkOrderData, authenticateUser.getHeaderObject()).then(function(response){
                        $scope.getAllStocks();
                        $scope.clearData();
                        window.hideLoader();
                        alert("Stock Details Added/Updated Successfully")
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

        $scope.removeStock = function(selectedStockId) {
            window.showLoader();
            $http.delete(appConstants.stockApi + cachedData.id + "/stocks/" + selectedStockId, authenticateUser.getHeaderObject()).then(function(response) {
                if(response.status == 200) {
                    window.hideLoader();
                    $scope.getAllStocks();
                    alert("Stock Details Successfully Deleted.");
                }
            }, function(response) {
                $scope.clearData();
                window.hideLoader();
                alert(response.data, "error");
                
            })
        }

        $scope.clearData = function() {
            $scope.cost = "";
            $scope.stock_type = "";
            $scope.item_name = "";
            $scope.number_of_items = "";
        }

        $scope.fillStockData = function(supplier) {
            if($scope.item_name.indexOf("-") > -1) {
                var data = $scope.item_name.split(" - ");
                var object = $scope.stockList.filter((stockInfo) => stockInfo.item_name == data[0] && stockInfo.stock_type == data[1])[0]
                $scope.cost = parseInt(object.cost);
                $scope.stock_type = parseInt(object.stock_type);
                $scope.item_name = object.item_name;
                $scope.number_of_items = object.number_of_items;
            }
        }

        $scope.compareObjects = function(obj) {
            if(obj.item_name == $scope.item_name && $scope.stock_type == obj.stock_type) {
                return true;
            } else return false;
        }

        $scope.compareAllObjects = function(obj) {
            if(obj.item_name == $scope.item_name && $scope.stock_type == obj.stock_type && $scope.number_of_items == obj.number_of_items) {
                return true;
            } else return false;
        }

    }

    return stockController;

});