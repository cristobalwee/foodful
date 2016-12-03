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

app.controller('SearchController', ['$scope', '$http', 'NgMap', 'NavigatorGeolocation', function($scope, $http, NgMap, NavigatorGeolocation) {

	$scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXUxA57EfUTXdhcK27-kc6r6HFqPBT5J4&libraries=places";

	var myLatLng = {lat: -25.363, lng: 131.044};

	NavigatorGeolocation.getCurrentPosition().then(function(position) {
		$scope.lat = position.coords.latitude;
		$scope.lng = position.coords.longitude;
	});




}]);
