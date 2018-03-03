define([], function() {

    var routeInitializer = {

        initializeAngularRouting: function() {

            var appModule = angular.module("appModule");

            appModule.config(function($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider){

                $locationProvider.html5Mode(true);

                $httpProvider.interceptors.push(function ($q) {
                    return {
                        'response': function (response) {
                            console.log(response);
                            return response;
                        },
                        'responseError': function (rejection) {
                            if(rejection.status === 401) {
                                location.reload();
                            }
                            alert(JSON.stringify(rejection.data))
                            return $q.reject(rejection);
                        }
                    };
                });

                $httpProvider.defaults.headers.common = {};
                $httpProvider.defaults.headers.post = {};
                $httpProvider.defaults.headers.put = {};
                $httpProvider.defaults.headers.patch = {};
                $httpProvider.defaults.headers.get = {};

                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];

                $sceDelegateProvider.resourceUrlWhitelist(['self', /^http?:\/\/(cdn\.)?ec2-13-58-74-246.us-east-2.compute.amazonaws.com:5000/]);

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