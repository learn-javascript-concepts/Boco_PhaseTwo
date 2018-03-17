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
        "descriptionController": "appScripts/controllers/descriptionController",
        "fontAwesome": "https://use.fontawesome.com/releases/v5.0.6/js/all",
        "bootstrapBundle": "assets/bootstrap/js/bootstrap.bundle",
        "datePicker": "assets/plugins/date-picker/bootstrap-datepicker.min",
        "appScript": "assets/js/script",
        "ngStorage": "lib/ngstorage/ngStorage",
        "ngMaps": "appScripts/maps/ng-maps",
        "logoutController": "appScripts/controllers/logoutController",
        "customerScreenDescriptionController": "appScripts/controllers/customerScreenDescriptionController",
        "subContractorScreenDescriptionController": "appScripts/controllers/subContractorScreenDescriptionController",
        "sweetalert": "alertScript/sweetalert",
        "jquery.loading": "lib/jquery-loading/dist/jquery.loading"
    },
    shim: {

        "angular-loading-overlay": { 
            deps: ["angular"]
        },
        "angular-screenshot": { 
            deps: ["angular"]
        },
        "angular-cookies": {
            deps: ["angular"]
        },
        "angular-route" : {
            deps: ["angular"]
        },
        "jquery.loading": {
            deps: ["jquery"]
        },
        "appScript" : {
            deps: ["jquery"]
        },
        "sweetalert": {
            deps: ["jquery"]
        },
        "appModule": {
            deps: ["angular", "angular-route", "angular-cookies", "angular-screenshot", "jquery", "bootstrapBundle", "datePicker", "appScript", "ngStorage", "sweetalert", "jquery.loading"]
        }
    }
});

require(["appModule"], function(appModule) {
    require(["ngMaps"], function() {
        appModule.init();
    })
    
});