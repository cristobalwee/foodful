app.controller('LandingController', ['$scope', '$http', function($scope, $http) {

}]);

app.controller('FactsController', ['$scope', '$http', function($scope, $http) {

}]);

app.controller('PurposeController', ['$scope', '$http', function($scope, $http) {

}]);

app.controller('LegalController', ['$scope', '$http', function($scope, $http) {

}]);

app.controller('ContactController', ['$scope', '$http', function($scope, $http) {

}]);

app.controller('AboutController', ['$scope', '$http', function($scope, $http) {

}]);

app.controller('LoginController', ['$scope', 'UserAuth', function($scope, UserAuth) {
    
}]);

app.controller('RegisterController', ['$scope', 'UserAuth', function($scope, UserAuth) {
    $scope.registerData = {};
    $scope.register = function() {
        $scope.registerData.location = "";
        $scope.registerData.location += $scope.address + " ";
        $scope.registerData.location += $scope.city + " ";
        $scope.registerData.location += $scope.state + " ";
        $scope.registerData.location += $scope.zipcode;
        if ($scope.startTime == 'PM') {
            $scope.registerData.start_hour += 12;
        }
        if ($scope.endTime == 'PM') {
            $scope.registerData.end_hour += 12;
        }
        if ($scope.pwConfirm != $scope.registerData.password) {
            console.log('password is different');
        } else {
            console.log('created');
            UserAuth.register($scope.registerData).then(function(data) {
                console.log('wooo');
            }).catch(function(data) {
                console.log('noooo');
            });
        }
    }
}]);

app.controller('SearchController', ['$scope', '$http', 'NgMap', 'NavigatorGeolocation', function($scope, $http, NgMap, NavigatorGeolocation) {

	$scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXUxA57EfUTXdhcK27-kc6r6HFqPBT5J4&libraries=places";

	var myLatLng = {lat: -25.363, lng: 131.044};

	NavigatorGeolocation.getCurrentPosition().then(function(position) {
		$scope.lat = position.coords.latitude;
		$scope.lng = position.coords.longitude;
	});




}]);
