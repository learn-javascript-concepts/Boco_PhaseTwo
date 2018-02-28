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

        this.updateCustomerDetails = function(customerDetails) {
            if($sessionStorage.cachedWorkOrder) {
                cachedWorkOrder.customer_details = customerDetails;
                $sessionStorage.cachedWorkOrder.customer_details = customerDetails;
            }
        }

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
    