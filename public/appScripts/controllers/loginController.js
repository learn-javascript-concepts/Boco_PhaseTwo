define([], function(){

    var loginController = function($scope, $location, $http, $cookies, authenticateUser, appConstants){

        authenticateUser.redirectToLandingPageIfAuthenticated();

        $scope.userName = "";
        $scope.userPassword = "";

         b$scope.logoutUser = function() {
            authenticateUser.clearAuthenticationToken();
        }

        $scope.authenticateUserLogin = function() {

            $cookies.put("authToken", "");

            var authenticationData = {
                userName: $scope.userName,
                userPassword: $scope.userPassword
            }

            $http.post(appConstants.authenticateUserUrl, authenticationData).then(function(response) {
                
                if(response.status == 200 && response.data.isAuthenticated == true) {
                    authenticateUser.setAuthenticationToken(response.data.authToken);
                    $location.path("workorder");
                } else {
                    alert("Enter Correct Credentials");
                }
            });          
        }
    }
    
    return loginController;
})
