require.config({
    baseUrl: "/",
    paths: {
        "angular": "lib/angular/angular.min",
        "angular-route": "lib/angular-route/angular-route.min",
        "jquery": "lib/jquery/dist/jquery.min",
        "appModule": "appScripts/appModule",
        "appModuleRouting": "appScripts/appModuleRouting",
        "loginController": "appScripts/controllers/loginController",
        "angular-cookies": "lib/angular-cookies/angular-cookies.min",
        "authenticateUser": "appScripts/services/authenticateUser",
        "workOrderController": "appScripts/controllers/workOrderController",
        "createWorkOrderController": "appScripts/controllers/createWorkOrderController",
        "appConstants": "appScripts/appConstants",
        "workOrderCache": "appScripts/services/workOrderCache",
        "descriptionController": "appScripts/controllers/descriptionController",
        "fontAwesome": "https://use.fontawesome.com/releases/v5.0.6/js/all",
        "bootstrapBundle": "assets/bootstrap/js/bootstrap.bundle",
        "appScript": "assets/js/script",
        "ngStorage": "lib/ngstorage/ngStorage",
        "ngMaps": "appScripts/maps/ng-maps",
        "logoutController": "appScripts/controllers/logoutController",
        "customerScreenDescriptionController": "appScripts/controllers/customerScreenDescriptionController",
        "subContractorScreenDescriptionController": "appScripts/controllers/subContractorScreenDescriptionController",
        "supplierController": "appScripts/controllers/supplierController",
        "supplierCache": "appScripts/services/supplierCache",
        "customerCache": "appScripts/services/customerCache",
        "jquery.loading": "lib/jquery-loading/dist/jquery.loading.min"
    },
    shim: {
        "appModule": {
            deps: [
                "angular",
                "angular-route", 
                "angular-cookies", 
                "ngStorage", 
                "ngMaps",
                "appModuleRouting", 
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
                "supplierCache",
                "customerCache"
            ]
        }
    }
});

require(["appModule"], function(appModule) {
    
        appModule.init();
    
});