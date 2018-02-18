define([], function() {

    function authenticateUser($cookies, $location) {

        this.isUserAuthenticated = function() {
            var authToken = $cookies.get('authToken');

            if(authToken) {
                return true;
            } else return false;
        }

        this.redirectToLoginIfUnauthenticated = function() {
            var authToken = $cookies.get('authToken');
            if(!authToken) {
                $location.path("/");
            }
        }

        this.redirectToLandingPageIfAuthenticated = function() {
            var authToken = $cookies.get("authToken");
            if(authToken) {
                $location.path("workorder");
            }
        }

        this.getAuthenticationToken = function() {
            return $cookies.get('authToken');
        }

        this.setAuthenticationToken = function(value) {
            $cookies.put("authToken", value);
        }

        this.clearAuthenticationToken = function(value) {
            $cookies.put("authToken", "");
        }

    }

    return authenticateUser;
})