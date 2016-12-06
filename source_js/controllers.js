var foodfulControllers = angular.module('foodfulControllers', []);

foodfulControllers.controller('LandingController', ['$scope', 'UserAuth', function($scope, UserAuth) {
    $scope.isLogged = UserAuth.isLoggedIn();
    console.log($scope.isLogged);
    position = 0;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
}]);

foodfulControllers.controller('FactsController', ['$scope', '$http', function($scope, $http) {
    position = 1;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
}]);

foodfulControllers.controller('PurposeController', ['$scope', '$http', function($scope, $http) {
    position = 2;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
}]);

foodfulControllers.controller('LegalController', ['$scope', '$http', function($scope, $http) {
    position = 3;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
}]);

foodfulControllers.controller('ContactController', ['$scope', '$http', function($scope, $http) {
    position = 4;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
}]);

foodfulControllers.controller('AboutController', ['$scope', '$http', function($scope, $http) {
    position = -1;
    document.body.style.overflow = "scroll";
}]);

foodfulControllers.controller('LoginController', ['$scope', '$location', 'UserAuth', function($scope, $location, UserAuth) {
    position = -1;
    document.body.style.overflow = "scroll";
    $scope.loginData = {};
    $scope.login = function() {
        UserAuth.loginUser($scope.loginData).then(function(arg) {
            UserAuth.saveToken(arg.data.token);
            console.log('logged in!');
            console.log(arg);
            $location.path('profile');
        }).catch(function(arg) {
            console.log(arg);
        });
    };
}]);

foodfulControllers.controller('RegisterController', ['$scope', 'UserAuth', function($scope, UserAuth) {
    position = -1;
    document.body.style.overflow = "scroll";
    $scope.registerData = {};
    $scope.register = function() {
        /*
        $scope.registerData.location = "";
        $scope.registerData.location += $scope.address + " ";
        $scope.registerData.location += $scope.city + " ";
        $scope.registerData.location += $scope.state + " ";
        $scope.registerData.location += $scope.zipcode;
        */
        /*$scope.registerData.name = "d";
        $scope.registerData.email = "dasdfsd@gmail.com";
        $scope.registerData.phone_number = "1112223333";
        $scope.registerData.start_hour = "10";
        $scope.registerData.start_minute = "0";
        $scope.registerData.end_hour = "5";
        $scope.registerData.end_minute = "30";
        $scope.registerData.password = "pw1";
        $scope.pwConfirm = "pw1";
        $scope.startTime = "AM";
        $scope.endTime = "AM";
        $scope.registerData.typeID = 1;*/
        $scope.registerData.location = [1, 2];
        if ($scope.startTime == 'PM') {
            $scope.registerData.start_hour += 12;
        }
        if ($scope.endTime == 'PM') {
            $scope.registerData.end_hour += 12;
        }
        if ($scope.pwConfirm != $scope.registerData.password) {
            console.log('password is different');
        } else {
            UserAuth.registerUser($scope.registerData).then(function(arg) {
                UserAuth.saveToken(arg.data.token);
                $location.path('profile');
            }).catch(function(arg) {
                console.log(arg);
            });
        }
    };
}]);

foodfulControllers.controller('SearchController', ['$scope', '$http', 'NgMap', 'NavigatorGeolocation', function($scope, $http, NgMap, NavigatorGeolocation) {

	$scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXUxA57EfUTXdhcK27-kc6r6HFqPBT5J4&libraries=places";

	var myLatLng = {lat: -25.363, lng: 131.044};

	NavigatorGeolocation.getCurrentPosition().then(function(position) {
		$scope.lat = position.coords.latitude;
		$scope.lng = position.coords.longitude;
	});




}]);
