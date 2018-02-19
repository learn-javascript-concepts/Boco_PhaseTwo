require.config({
    baseUrl: "/",
    paths: {
        "angular": "lib/angular/angular",
        "angular-route": "lib/angular-route/angular-route",
        "jquery": "lib/jquery/dist/jquery",
        "angular-screenshot": "lib/angular-screenshot/build/angular-screenshot",
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
        "angular-screenshot": { 
            deps: ["angular"]
        },
        "angular-cookies": {
            deps: ["angular"]
        },
        "angular-route" : {
            deps: ["angular"]
        },
        "appModule": {
            deps: ["angular", "angular-route", "angular-cookies", "angular-screenshot", "jquery"]
        }
    }
});

require(["appModule"], function(appModule) {
    appModule.init();
});