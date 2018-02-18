define([], function() {

    var routeInitializer = {

        initializeAngularRouting: function() {

            var appModule = angular.module("appModule");

            appModule.config(function($routeProvider, $locationProvider){

                $locationProvider.html5Mode(true);

                $routeProvider.when("/", {
                    templateUrl: "./partials/login.html",
                    controller: "loginController"
                }).when("/workorder", {
                    templateUrl: "./partials/searchOrCreateWorkOrder.html",
                    controller: "workOrderController"
                }).when("/createworkorder", {
                    templateUrl: "./partials/createWorkOrder.html",
                    controller: "createWorkOrderController"
                }).when("/description", {
                    templateUrl: "./partials/description.html",
                    controller: "descriptionController"
                });
            });

        }
    }

    return routeInitializer;
});