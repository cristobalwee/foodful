var foodfulControllers = angular.module('foodfulControllers', ['ngMap']);

foodfulControllers.controller('LandingController', ['$scope', 'UserAuth', function($scope, UserAuth) {
    $scope.isLogged = UserAuth.isLoggedIn();
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
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
}]);

foodfulControllers.controller('LoginController', ['$scope', '$location', 'UserAuth', function($scope, $location, UserAuth) {
    position = -1;
    document.body.style.overflow = "scroll";
    // If there is no userlogged in, the login page
    if (UserAuth.currentUser() == null){
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
    }else{
        // redirect to login page
        $location.path('/profile');
    }
}]);

foodfulControllers.controller('RegisterController', ['$scope', '$location', 'UserAuth', 'GeoCoder', function($scope, $location, UserAuth, GeoCoder) {
    position = -1;
    document.body.style.overflow = "scroll";
    $scope.states = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];
    $scope.registerData = {};
    $scope.register = function() {
        /*
        $scope.registerData.name = "d";
        $scope.registerData.email = "d234@gmail.com";
        $scope.registerData.phone_number = "1112223333";
        $scope.registerData.start_hour = "10";
        $scope.registerData.start_minute = "0";
        $scope.registerData.end_hour = "5";
        $scope.registerData.end_minute = "30";
        $scope.registerData.password = "pw1";
        $scope.pwConfirm = "pw1";
        $scope.startTime = "AM";
        $scope.endTime = "AM";
        $scope.registerData.typeID = 1;
        */
        $scope.registerData.address = $scope.address;
        $scope.registerData.city = $scope.city;
        $scope.registerData.state = $scope.state;
        $scope.registerData.zipcode = $scope.zipcode;
        $scope.registerData.start_hour = $scope.starthr;
        $scope.registerData.end_hour = $scope.endhr;
        if ($scope.startTime == 'PM') {
            $scope.registerData.start_hour = parseInt($scope.registerData.start_hour) + 12;
        }
        if ($scope.endTime == 'PM') {
            $scope.registerData.end_hour = parseInt($scope.registerData.end_hour) + 12;
        }
        if ($scope.pwConfirm != $scope.registerData.password) {
            console.log('password is different');
        } else {
            GeoCoder.geocode({address: $scope.address + $scope.city + $scope.state + $scope.zipcode}).then(function(result) {
                $scope.registerData.loc = [];
                $scope.registerData.loc[0] = result[0].geometry.location.lng();
                $scope.registerData.loc[1] = result[0].geometry.location.lat();
                UserAuth.registerUser($scope.registerData).then(function(arg) {
                    UserAuth.saveToken(arg.data.token);
                    $location.path('profile');
                }).catch(function(arg) {
                    console.log(arg);
                });
            }).catch(function(arg) {
                console.log(arg);
            });
        }
    };
}]);

foodfulControllers.controller('SearchController', ['$scope', '$http', 'NgMap', 'NavigatorGeolocation', 'GeoCoder', 'NavService', function($scope, $http, NgMap, NavigatorGeolocation, GeoCoder, NavService) {

    position = -1;
    document.body.style.overflow = "scroll";
	$scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXUxA57EfUTXdhcK27-kc6r6HFqPBT5J4&libraries=places";

	NavigatorGeolocation.getCurrentPosition().then(function(position) {
		$scope.lat = position.coords.latitude;
		$scope.lng = position.coords.longitude;
	});

    $scope.searchResults = [];
    $scope.result = {};
    $scope.search = {};
    
    NgMap.getMap('map').then(function(map) {
      $scope.map = map;
    }).catch(function(err) {
      console.log(err);
    });
    $scope.showDetail = function(info) { 
      $scope.result = info;
      //console.log(info.latLng.lat());
      //$scope.map.showInfoWindow('map-info', $scope.result);
    }
    $scope.getNearby = function() {
        GeoCoder.geocode({address: $scope.searchAddress}).then(function(result) {
            $scope.search.latitude = result[0].geometry.location.lat();
            $scope.search.longitude = result[0].geometry.location.lng();
            NavService.getNearby($scope.search).then(function(result) {
              var results = result.data.data;
              results.forEach(function(elem) {
                elem.id = elem._id;
                var lat = elem.location[1];
                var lng = elem.location[0];
                elem.position = '[' + lat + ', ' + lng + ']';
                $scope.searchResults.push(elem);
              });
            }).catch(function(message) {
              console.log(message);
            });
        });
    }
}]);

foodfulControllers.controller('ProfileController', ['$scope', '$http', 'Prof', 'UserAuth', '$location', function($scope, $http, Prof, UserAuth, $location) {
  position = -1;
  document.body.style.overflow = "scroll";

  Prof.getProfile().success(function(data) {
    console.log(data);
    $scope.user = data.data;
    $scope.showStatus = false;
    if($scope.user.typeID == 1)
      $scope.showStatus = true;
  }).error(function(err) {
    console.log(err);
  });

  $scope.logout = function() {
    UserAuth.logout();
      $location.path('/');
  };
}]);

foodfulControllers.controller('PublicProfileController', ['$scope', '$http','$routeParams', 'Prof', '$location', 'UserAuth', function($scope, $http, $routeParams, Prof, $location, UserAuth) {
    position = -1;
    document.body.style.overflow = "scroll";

    $scope.profileID = $routeParams.id;

    $scope.logout = function() {
      UserAuth.logout();
        $location.path('/');
    };
    /* Control the Public Profile */
    $scope.show = false
    if (UserAuth.currentUser != null){
        $scope.show = true;
    }
    console.log($scope.show);


    Prof.getPublicProfile($scope.profileID).success(function(data) {
        console.log(data);
        $scope.user = data.data;

    }).error(function(err){
        console.log(err);
    });



}]);

foodfulControllers.controller('EditProfileController', ['$scope', '$http', 'Prof', '$location', 'UserAuth', function($scope, $http, Prof, $location, UserAuth) {
  position = -1;
  document.body.style.overflow = "scroll";

  $scope.logout = function() {
    UserAuth.logout();
      $location.path('/');
  };

  Prof.getProfile().success(function(data) {
    /*$scope.displayText = "";
    $scope.showDisplay = false;
    $scope.displayBackground = "#FF0000";
    $scope.user = data.data;
    $scope.showStatus = false;
    if($scope.user.typeID == 1)
      $scope.showStatus = true;
    $scope.updateProfile = function() {
      if($scope.user.name !== "" && $scope.user.email !== "") {
        Prof.updateProfile($scope.user).success(function(data) {
          $scope.displayBackground = "#1addbd";
          $scope.displayText = "Profile Updated";
        }).error(function(err) {
          $scope.displayText = err.message;
        });
      }
      else {
        $scope.displayText = "Please Fill in All Required Information";
      }
      $scope.showDisplay = true;*
    };*/
    $scope.user = data.data;
    $scope.states = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];
    $scope.update = function() {
        /*
        $scope.registerData.name = "d";
        $scope.registerData.email = "d234@gmail.com";
        $scope.registerData.phone_number = "1112223333";
        $scope.registerData.start_hour = "10";
        $scope.registerData.start_minute = "0";
        $scope.registerData.end_hour = "5";
        $scope.registerData.end_minute = "30";
        $scope.registerData.password = "pw1";
        $scope.pwConfirm = "pw1";
        $scope.startTime = "AM";
        $scope.endTime = "AM";
        $scope.registerData.typeID = 1;
        */
        $scope.locstring = "";
        $scope.locstring += $scope.address + " ";
        $scope.locstring += $scope.city + " ";
        $scope.locstring += $scope.state + " ";
        $scope.locstring += $scope.zipcode;

        if ($scope.startTime == 'PM') {
            $scope.user.start_hour += 12;
        }
        if ($scope.endTime == 'PM') {
            $scope.user.end_hour += 12;
        }
        Prof.updateProfile($scope.user);
      /*  GeoCoder.geocode({address: $scope.locstring}).then(function(result) {
            $scope.registerData.loc = [];
            $scope.registerData.loc[0] = result[0].geometry.location.lng();
            $scope.registerData.loc[1] = result[0].geometry.location.lat();
            UserAuth.registerUser($scope.registerData).then(function(arg) {
                UserAuth.saveToken(arg.data.token);
                console.log(arg);
                $location.path('profile');
            }).catch(function(arg) {
                console.log(arg);
            });
        }).catch(function(arg) {
            console.log(arg);
        });*/
    };
  });
}]);

foodfulControllers.controller('FavoritesController', ['$scope', '$http', 'Prof', function($scope, $http, Prof) {
    Prof.getProfile().success(function(data) {
      $scope.user = data.data;
      var favoritesids = $scope.user.favorites;
      $scope.favorites = [];
      for(var i = 0; i < favoritesids.length; i++) {
        Prof.getPublicProfile(favoritesids[i]).success(function(data) {
          $scope.favorites.push(data.data);
        })
      }
    });
}]);
