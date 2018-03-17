define([], function() {

    var serverUrl = "http://ec2-18-217-39-52.us-east-2.compute.amazonaws.com:5000/"
    //var serverUrl = "http://localhost/api/"

    var appConstants = {
        authenticateUserUrl: serverUrl + "api-token-auth/",
        getWorkOrder: serverUrl + "workorders/?",
        createWorkOrder: serverUrl + "workorders/",
        getRandomWorkOrder: serverUrl + "workorders/getNextNumber/",
        getDetailedWorkorder: serverUrl + "getdetailedworkorder/",
        saveDescription: serverUrl + "workorders/",
        updateCustomerDetails: serverUrl + "customers/",
        addNewCustomer: serverUrl + "customers/",
        getAllWorkOrders: serverUrl + "getallworkorders",
        getSelectedCustomer: serverUrl + "customers/?",
        getAllCustomers: serverUrl + "customers/",

        getWorkOrderList: serverUrl + "workorders/list/",

        updateSubContractorDetails: serverUrl + "subcontractors/",
        getAllSubContractors: serverUrl + "subcontractors/",
        addNewSubContractor: serverUrl + "subcontractors/",
        getSelectedSubContractor: serverUrl + "subcontractors/?",

    }

    return appConstants;

});
