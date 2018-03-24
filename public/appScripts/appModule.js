define(["appModuleRouting", 
        "loginController", 
        "authenticateUser", 
        "workOrderController", 
        "createWorkOrderController", 
        "appConstants",
        "workOrderCache",
        "descriptionController",
        "customerScreenDescriptionController",
        "subContractorScreenDescriptionController",
        "logoutController",
        "supplierController",
        "equipmentController",
        "supplierCache"
    ], function(
            appModuleRouting, 
            loginController, 
            authenticateUser, 
            workOrderController, 
            createWorkOrderController, 
            appConstants,
            workOrderCache,
            descriptionController,
            customerScreenDescriptionController,
            subContractorScreenDescriptionController,
            logoutController,
            supplierController,
            equipmentController,
            supplierCache) {

    var appModule = {
        init : function() {
            var appModule = angular.module("appModule", ["ngRoute", "ngCookies", "ngStorage", "ngMap"]);

            appModule.controller("loginController", loginController);

            appModule.controller("workOrderController", workOrderController);

            appModule.controller("createWorkOrderController", createWorkOrderController);
            
            appModule.controller("descriptionController", descriptionController);

            appModule.controller("customerScreenDescriptionController", customerScreenDescriptionController);

            appModule.controller("subContractorScreenDescriptionController", subContractorScreenDescriptionController);

            appModule.controller("logoutController", logoutController);

            appModule.controller("supplierController", supplierController);

            appModule.controller("equipmentController", equipmentController);

            appModule.service("authenticateUser", authenticateUser);

            appModule.service("customerCache", workOrderCache);

            appModule.service("workOrderCache", workOrderCache);

            appModule.service("supplierCache", workOrderCache);

            appModule.constant("appConstants", appConstants);

            appModuleRouting.initializeAngularRouting();
            
            angular.bootstrap(document, ["appModule"]);
        }
    }

    return appModule;
});