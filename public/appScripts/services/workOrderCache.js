define([], function() {

    var workOrderCache = function($sessionStorage) {

        var cachedWorkOrder = null;

        this.clearCachedWorkOrder = function() {
            cachedWorkOrder = null;
        };
        
        this.saveWorkOrderDetails = function(workOrderData) {
            cachedWorkOrder = workOrderData
            $sessionStorage.cachedWorkOrder = cachedWorkOrder;
        };

        this.getWorkOrderDetail = function() {
            if(cachedWorkOrder) {
                return cachedWorkOrder;
            } else {
                cachedWorkOrder = $sessionStorage.cachedWorkOrder;
                return cachedWorkOrder;
            }
            
        }
    }
        
    return workOrderCache;
});
    