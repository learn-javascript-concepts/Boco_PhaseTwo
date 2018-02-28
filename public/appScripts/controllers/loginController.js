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

            $cookies.put("token", "");

            var authenticationData = {
                "username": $scope.userName,
                "password": $scope.userPassword
            }

            $http.post(appConstants.authenticateUserUrl, authenticationData, {
                headers: {
                    "Authorization": $cookies.get('token'),
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                }
            }).then(function(response) {
                
                if(response.status == 200 && response.data.token.length > 0) {
                    authenticateUser.setAuthenticationToken(response.data.token);
                    $location.path("workorder");
                } else {
                    alert("Enter Correct Credentials");
                }
            });          
        }
    }
    
    return loginController;
})
