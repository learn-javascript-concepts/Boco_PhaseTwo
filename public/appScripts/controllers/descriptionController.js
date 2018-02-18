define([], function() {
    var descriptionController = function($scope, workOrderCache) {
        $scope.work_order_num = workOrderCache.getWorkOrderDetail().work_order_num;
        $scope.customer_po_num = workOrderCache.getWorkOrderDetail().customer_po_num;
        $scope.work_order_by = workOrderCache.getWorkOrderDetail().work_order_by;
    }
    return descriptionController;
});