require.config({
    baseUrl: "/",
    paths: {
        "angular": "lib/angular/angular",
        "angular-route": "lib/angular-route/angular-route",
        "appModule": "appScripts/appModule",
        "appModuleRouting": "appScripts/appModuleRouting",
        "loginController": "appScripts/controllers/loginController",
        "angular-cookies": "lib/angular-cookies/angular-cookies",
        "authenticateUser": "appScripts/services/authenticateUser",
        "workOrderController": "appScripts/controllers/workOrderController",
        "createWorkOrderController": "appScripts/controllers/createWorkOrderController",
        "appConstants": "appScripts/appConstants",
        "workOrderCache": "appScripts/services/workOrderCache",
        "descriptionController": "appScripts/controllers/descriptionController"
    },
    shim: {
        "angular-cookies": {
            deps: ["angular"]
        },
        "angular-route" : {
            deps: ["angular"]
        },
        "appModule": {
            deps: ["angular", "angular-route", "angular-cookies"]
        }
    }
});

require(["appModule"], function(appModule) {
    appModule.init();
});