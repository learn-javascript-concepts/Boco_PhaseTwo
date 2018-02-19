define([], function(){

    var loginController = function($scope, $location, $http, $cookies, authenticateUser, appConstants){

        $scope.screenshotTargetOptions = {
            filename: "screenshotTarget.png",
            downloadText: "Click here to download",
            cancelText: "Click here to cancel download!!!"
        }

        authenticateUser.redirectToLandingPageIfAuthenticated();

        $scope.userName = "";
        $scope.userPassword = "";
        $scope.isOpen = false;

         $scope.logoutUser = function() {
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
