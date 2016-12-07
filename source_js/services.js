var foodfulServices = angular.module('foodfulServices', []);

foodfulServices.factory('UserAuth', function($http, $window) {
    var api = 'http://fa16-cs498rk-016.cs.illinois.edu:3000/api';
    var loginUser = function(loginData) {
        return $http.post(api + '/login', loginData);
    }
    var registerUser = function(userData) {
        return $http.post(api + '/register', userData);
    }
    var isLoggedIn = function() {
        var token = getToken();
        var payload;
        if (token) {
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }
    var currentUser = function() {
        if (isLoggedIn()) {
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return {
                email: payload.email,
                name: payload.name
            };
        }else{
            return null;
        }
    }
    var saveToken = function(token) {
        $window.localStorage['foodful-token'] = token;
    }
    var getToken = function() {
        return $window.localStorage['foodful-token'];
    }
    var logout = function() {
        $window.localStorage.removeItem('foodful-token');
    }

    return {
        loginUser: loginUser,
        registerUser: registerUser,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,
        saveToken: saveToken,
        getToken: getToken,
        logout: logout,
    }
});


foodfulServices.factory('NavService', function($http) {
    var api = 'http://fa16-cs498rk-016.cs.illinois.edu:3000/api';
    var getNearby = function(params) {
        return $http.post(api + '/search', params);
    }

    return {
        getNearby: getNearby
    }
});


foodfulServices.factory('Prof', function($http, $window, UserAuth) {
  var api = 'http://fa16-cs498rk-016.cs.illinois.edu:3000/api';
  var getProfile = function() {
    var token = UserAuth.getToken();
    var payload;
    payload = token.split('.')[1];
    payload = $window.atob(payload);
    payload = JSON.parse(payload);
    return $http.get(api + '/profile', {
      headers: {
        Authorization: 'Bearer '+ UserAuth.getToken()
      }
    });
  };

  var updateProfile = function(user) {
    var token = UserAuth.getToken();
    var payload;
    payload = token.split('.')[1];
    payload = $window.atob(payload);
    payload = JSON.parse(payload);
    return $http.put(api + '/profile', user, {
      headers: {
        Authorization: 'Bearer ' + UserAuth.getToken()
      }
    });
  };


  var getPublicProfile = function(id) {
      return $http.get(api + '/profile/' + id);
  }

  return {
    getProfile : getProfile,
    updateProfile : updateProfile,
    getPublicProfile : getPublicProfile
  };
});
