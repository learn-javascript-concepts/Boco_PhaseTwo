define([], function() {

    function authenticateUser($cookies, $location) {

        this.isUserAuthenticated = function() {
            var token = $cookies.get('token');

            if(token) {
                return true;
            } else return false;
        }

        this.redirectToLoginIfUnauthenticated = function() {
            var token = $cookies.get('token');
            if(!token) {
                $location.path("/");
            }
        }

        this.redirectToLandingPageIfAuthenticated = function() {
            var token = $cookies.get("token");
            if(token) {
                $location.path("workorder");
            }
        }

        this.getAuthenticationToken = function() {
            return $cookies.get('token');
        }

        this.setAuthenticationToken = function(value) {
            $cookies.put("token", "jwt " + value);
        }

        this.clearAuthenticationToken = function(value) {
            $cookies.put("token", "");
        }

        this.getHeaderObject = function() {
            var configObject = {
                headers: {
                    "token": $cookies.get('token')
                }
            };

            return configObject;
        }

    }

    return authenticateUser;
})