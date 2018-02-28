define([], function() {

    var serverUrl = "http://ec2-13-58-74-246.us-east-2.compute.amazonaws.com:5000/"
    //var serverUrl = "http://localhost/api/"

    var appConstants = {
        authenticateUserUrl: serverUrl + "api-token-auth/",
        getWorkOrder: serverUrl + "workorders/?",
        createWorkOrder: serverUrl + "workorders/",
        getRandomWorkOrder: serverUrl + "workorders/getNextNumber/",
        getDetailedWorkorder: serverUrl + "getdetailedworkorder/",
        saveDescription: serverUrl + "workorders/",
        updateCustomerDetails: serverUrl + "updateCustomerDetails",
        addNewCustomer: serverUrl + "customers/",
        getAllWorkOrders: serverUrl + "getallworkorders",
        getSelectedCustomer: serverUrl + "customer/"
    }

    return appConstants;

});
