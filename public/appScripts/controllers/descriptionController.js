define([], function() {
    var descriptionController = function($scope, workOrderCache) {
        var cachedData = workOrderCache.getWorkOrderDetail();
        $scope.work_order_num = cachedData.work_order_num;
        $scope.customer_po_num = cachedData.customer_po_num;
        $scope.work_order_by = cachedData.work_order_by;
        $scope.date_work_started = new Date(cachedData.date_work_started);
        $scope.created = new Date(cachedData.created);
        $scope.description = cachedData.description;
        $scope.other_requirements = cachedData.other_requirements;
    }
    return descriptionController;
});