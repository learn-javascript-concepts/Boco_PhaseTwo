define([], function() {

    var workOrderCache = function() {

        var cachedWorkOrder = null;

        this.clearCachedWorkOrder = function() {
            cachedWorkOrder = null;
        };
        
        this.saveWorkOrderDetails = function(workOrderData) {
            cachedWorkOrder = workOrderData
        };

        this.getWorkOrderDetail = function() {
            return cachedWorkOrder;
        }
    }
        
    return workOrderCache;
});
    