var foodfulServices = angular.module('foodfulServices', []);

foodfulServices.factory('UserAuth', function($http)) {
    var api = 'fa16-cs498rk-016.cs.illinois.edu:3000/api';
    return {
    registerUser: function(userData) {
        $http.post(api, userData).then(function(arg) {
            console.log(arg.data);
        }).catch(function(arg) {
            console.log(arg.message);
        });
    }
    }
}


