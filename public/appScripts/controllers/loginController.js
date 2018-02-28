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
                "Accept": "application/json",
                "Content-Type": 'application/json',
                "Cache-Control": "no-cache",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
            }).then(function(response) {
                
                if(response.status == 200 && response.data.isAuthenticated == true) {
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
