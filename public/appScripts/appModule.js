define(["appModuleRouting", 
        "loginController", 
        "authenticateUser", 
        "workOrderController", 
        "createWorkOrderController", 
        "appConstants",
        "workOrderCache",
        "descriptionController",
        "mapDirective"
    ], function(
            appModuleRouting, 
            loginController, 
            authenticateUser, 
            workOrderController, 
            createWorkOrderController, 
            appConstants,
            workOrderCache,
            mapDirective) {

    var appModule = {
        init : function() {
            var appModule = angular.module("appModule", ["ngRoute", "ngCookies", "angular-screenshot", "ngStorage"]);

            appModule.controller("loginController", loginController);

            appModule.controller("workOrderController", workOrderController);

            appModule.controller("createWorkOrderController", createWorkOrderController);
            
            appModule.controller("descriptionController", descriptionController);

            appModule.service("authenticateUser", authenticateUser);

            appModule.service("workOrderCache", workOrderCache);

            appModule.directive('myMap', mapDirective);

            appModule.constant("appConstants", appConstants);

            appModuleRouting.initializeAngularRouting();
            
            angular.bootstrap(document, ["appModule"]);
        }
    }

    return appModule;
});