var foodfulControllers = angular.module('foodfulControllers', []);

foodfulControllers.controller('LandingController', ['$scope', 'UserAuth', function($scope, UserAuth) {
    $scope.isLogged = UserAuth.currentUser();
    console.log($scope.isLogged == null);
    position = 0;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
}]);

foodfulControllers.controller('FactsController', ['$scope', '$http', 'UserAuth', function($scope, $http, UserAuth) {
    $scope.isLogged = UserAuth.currentUser();
    position = 1;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
}]);

foodfulControllers.controller('PurposeController', ['$scope', '$http', 'UserAuth', function($scope, $http, UserAuth) {
    $scope.isLogged = UserAuth.currentUser();
    position = 2;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
}]);

foodfulControllers.controller('LegalController', ['$scope', '$http', 'UserAuth', function($scope, $http, UserAuth) {
    $scope.isLogged = UserAuth.currentUser();
    position = 3;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
}]);

foodfulControllers.controller('ContactController', ['$scope', '$http', 'UserAuth', function($scope, $http, UserAuth) {
    $scope.isLogged = UserAuth.currentUser();
    position = 4;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
}]);

foodfulControllers.controller('AboutController', ['$scope', '$http', 'UserAuth', function($scope, $http, UserAuth) {
    $scope.isLogged = UserAuth.currentUser();
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

    //$scope.temp = [];
    $scope.searchResults = [];
    $scope.result = {
      name: "Name"
    };
    /*
    $scope.markers.push('908 w. stoughton st. urbana illinois 61801');
    $scope.markers.push('603 S Wright St, Champaign, IL 61820');
    $scope.markers.push('522 E Green St, Champaign, IL 61820');

    $scope.markers.forEach(function(elem) {
        GeoCoder.geocode({address: elem}).then(function(result) {
            var lat = result[0].geometry.location.lat();
            var lng = result[0].geometry.location.lng();
            //console.log(lat + " " + lng);
            $scope.temp.push('[' + lat + ', ' + lng + ']');
        });
    });
    */
    $scope.getNearby = function() {
        GeoCoder.geocode({address: $scope.searchAddress}).then(function(result) {
            $scope.search.latitude = result[0].geometry.location.lat();
            $scope.search.longitude = result[0].geometry.location.lng();
            NavService.getNearby($scope.search).then(function(result) {
              var results = result.data.data;
              results.forEach(function(elem) {
                console.log(elem);
                var lat = elem.location[1];
                var lng = elem.location[0];
                $scope.searchResults.push(elem);
                //$scope.searchResult.push('[' + lat + ', ' + lng + ']');
              });
            }).catch(function(message) {
              console.log(message);
            });
        });
        /*
        NavigatorGeolocation.getCurrentPosition().then(function(position) {
            $scope.queryParams.lat = position.coords.latitude;
            $scope.queryParams.long = position.coords.longitude;
        }).catch(function(arg) {
            console.log(arg);
        });
        */

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
  position = -1;
  document.body.style.overflow = "scroll";
  $scope.favorites = [
    {"_id":"584730a01c514238af6ff2cc","hash":"77982fa0d4cb0b60d2e5ed869fcbaaa8ad4e1be51584e631bdb828d4c5946568f42c3fe76a04aa6eee4d83332406cfa849c0e271afe0c5b804e27c953df3e574","salt":"dcd2b340d62e999953997013917a2aff","end_minute":20,"end_hour":15,"start_minute":20,"start_hour":2,"location":[40.2138425,-88.119828],"address":"Siebel Ave","phone_number":1234567890,"email":"henry@james.com","name":"henry james","typeID":0,
    "__v":0,"updated_date":"2016-12-06T21:41:52.741Z","created_date":"2016-12-06T21:41:52.741Z","favorites":[],"num_ratings":[],"rating":0,"amount":1},
    {"_id":"584730a01c514238af6ff2cd","hash":"7bb378c5c3fff71ae3191ef1ddd02a944c49cc0323265404544e3abb6c9f607d52ea4436f29758dd294dbc17d1d33f6baf9bcf68ac86184b0dbeb5cc9cfb5a53","salt":"ce5fae53d4ca0a31ed69e3eb2333fed0","end_minute":20,"end_hour":15,"start_minute":20,"start_hour":2,"location":[41.2138425,-89.219828],"city":"Urbana","state":"IL","zipcode":"61801","address":"Siebel Ave",
    "phone_number":123456789,"email":"jerry@carter.com","name":"jerry carter","typeID":1,"__v":0,"updated_date":"2016-12-06T21:41:52.819Z","created_date":"2016-12-06T21:41:52.819Z","favorites":[],"num_ratings":[],"rating":0,"amount":1}
  ]

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
