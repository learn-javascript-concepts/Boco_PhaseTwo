define([], function() {

    var serverUrl = "http://localhost/api/"

    var appConstants = {
        authenticateUserUrl: serverUrl + "authenticateuser",
        getWorkOrder: serverUrl + "getworkorder/",
        createWorkOrder: serverUrl + "createworkorder",
        getRandomWorkOrder: serverUrl + "getrandomworkorder",
        getDetailedWorkorder: serverUrl + "getdetailedworkorder/",
        saveDescription: serverUrl + "saveDescription",
        updateCustomerDetails: serverUrl + "updateCustomerDetails",
        addNewCustomer: serverUrl + "addNewCustomer"
    }

    return appConstants;

});
