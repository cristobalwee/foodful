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

app.controller('SearchController', ['$scope', '$http', 'NgMap', function($scope, $http, NgMap) {

	$scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXUxA57EfUTXdhcK27-kc6r6HFqPBT5J4";
  NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
}]);
