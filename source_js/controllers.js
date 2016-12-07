var foodfulControllers = angular.module('foodfulControllers', []);

foodfulControllers.controller('LandingController', ['$scope', 'UserAuth', '$location', function($scope, UserAuth, $location) {
    $scope.isLogged = UserAuth.currentUser();
    position = 0;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
    $scope.logout = function() {
      UserAuth.logout();
        $location.path('/');
    };
}]);

foodfulControllers.controller('FactsController', ['$scope', '$http', 'UserAuth', '$location', function($scope, $http, UserAuth, $location) {
    $scope.isLogged = UserAuth.currentUser();
    position = 1;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
    $scope.logout = function() {
      UserAuth.logout();
        $location.path('/');
    };
}]);

foodfulControllers.controller('PurposeController', ['$scope', '$http', 'UserAuth', '$location', function($scope, $http, UserAuth, $location) {
  $scope.isLogged = UserAuth.currentUser();
    position = 2;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
    $scope.logout = function() {
      UserAuth.logout();
        $location.path('/');
    };
}]);

foodfulControllers.controller('LegalController', ['$scope', '$http', 'UserAuth', '$location', function($scope, $http, UserAuth, $location) {
  $scope.isLogged = UserAuth.currentUser();
    position = 3;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
    $scope.logout = function() {
      UserAuth.logout();
        $location.path('/');
    };
}]);

foodfulControllers.controller('ContactController', ['$scope', '$http', 'UserAuth', '$location', function($scope, $http, UserAuth, $location) {
  $scope.isLogged = UserAuth.currentUser();
    position = 4;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
    $scope.logout = function() {
      UserAuth.logout();
        $location.path('/');
    };
}]);

foodfulControllers.controller('AboutController', ['$scope', '$http', 'UserAuth', '$location', function($scope, $http, UserAuth, $location) {
  $scope.isLogged = UserAuth.currentUser();
    position = -1;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
    $scope.logout = function() {
      UserAuth.logout();
        $location.path('/');
    };
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
    $scope.logout = function() {
      UserAuth.logout();
        $location.path('/');
    };
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
        // Form validation
        if ($scope.registerData.name == undefined) {

        }
        
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

foodfulControllers.controller('SearchController', ['$scope', '$http', 'NgMap', 'NavigatorGeolocation', 'GeoCoder', 'NavService', 'UserAuth', '$location', function($scope, $http, NgMap, NavigatorGeolocation, GeoCoder, NavService, UserAuth, $location) {
  $scope.isLogged = UserAuth.currentUser();
  position = -1;
  document.body.style.overflow = "scroll";
	$scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXUxA57EfUTXdhcK27-kc6r6HFqPBT5J4&libraries=places";

	NavigatorGeolocation.getCurrentPosition().then(function(position) {
		$scope.lat = position.coords.latitude;
		$scope.lng = position.coords.longitude;
	});

  NgMap.getMap().then(function(map) {
    $scope.map = map;
  });

  $scope.searchResults = [];

  $scope.result = {};
  $scope.selected = {};

  $scope.getNearby = function() {
    $scope.searchResults = [];
    GeoCoder.geocode({address: $scope.searchAddress}).then(function(result) {
      $scope.search.latitude = result[0].geometry.location.lat();
      $scope.search.longitude = result[0].geometry.location.lng();
      NavService.getNearby($scope.search).then(function(result) {
        var results = result.data.data;
        results.forEach(function(elem) {
          elem.id = elem._id;
          var lat = elem.location[1];
          var lng = elem.location[0];
          elem.locString = '[' + lat + ', ' + lng + ']';
          $scope.searchResults.push(elem);
        });
      }).catch(function(message) {
        console.log(message);
      });
    });
  };

  $scope.getCurrentLocation = function() {
    NavigatorGeolocation.getCurrentPosition().then(function(position) {
      $scope.lat = position.coords.latitude;
      $scope.lng = position.coords.longitude;
    });
  };

  $scope.showDetails = function(e, selected) {
    $scope.selected = selected;
    console.log($scope.map.markers);
    $scope.map.showInfoWindow('map-info', selected.id.toString());
  }
  $scope.logout = function() {
    UserAuth.logout();
      $location.path('/');
  };
}]);

foodfulControllers.controller('ProfileController', ['$scope', '$http', 'Prof', 'UserAuth', '$location', function($scope, $http, Prof, UserAuth, $location) {
  position = -1;
  document.body.style.overflow = "scroll";

  $scope.isLogged = UserAuth.currentUser();

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
    $scope.isLogged = UserAuth.currentUser();
    position = -1;
    document.body.style.overflow = "scroll";
    $scope.rating = 0;

    $scope.profileID = $routeParams.id;

    $scope.logout = function() {
      UserAuth.logout();
        $location.path('/');
    };
    /* Control the Public Profile */


    Prof.getPublicProfile($scope.profileID).success(function(data) {
      console.log("public profile");
        console.log(data);
        $scope.user = data.data;

    }).error(function(err){
        console.log(err);
    });

    $scope.show = false
    if (UserAuth.isLoggedIn()){
        $scope.show = true;

        console.log($scope.show);

        Prof.getProfile().success(function(data) {
          console.log("logged in user");
          console.log(data);
          $scope.loggedinUser = data.data;
          var favarray = $scope.loggedinUser.favorites;
          $scope.unfav = false;
          for(var i = 0; i < favarray.length; i++) {
            if(favarray[i] == $scope.user._id)
              $scope.unfav = true;
          }
          $scope.bothelem = ($scope.show && ($scope.unfav !== true));
          $scope.notbothelem = !$scope.bothelem;
          console.log("bothelem is " + $scope.bothelem);
          console.log("notbothelem is " + $scope.notbothelem);
        });
    }


    Prof.getPublicProfile($scope.profileID).success(function(data) {
        console.log(data);
        $scope.user = data.data;

    }).error(function(err){
        console.log(err);
    });

    $scope.favorite = function() {
        $scope.loggedinUser.favorites.push($scope.user._id);
        console.log($scope.loggedinUser);
        Prof.updateProfile($scope.loggedinUser).success(function(args) {
          console.log(args);
        }).error(function(arg) {
          console.log(arg);
        });
        $scope.bothelem = false;
        $scope.notbothelem = true;
    };

    $scope.unfavorite = function() {
        $scope.loggedinUser.favorites;
        for(var i = 0; i < $scope.loggedinUser.favorites.length; i++) {
          if($scope.loggedinUser.favorites[i] === $scope.user._id)
            $scope.loggedinUser.favorites.splice(i, 1);
        }
        Prof.updateProfile($scope.loggedinUser).success(function(args) {
          console.log(args);
        }).error(function(arg) {
          console.log(arg);
        });
        $scope.bothelem = true;
        $scope.notbothelem = false;
    };

    $scope.rate = function() {
      var temp = $scope.user.rating * $scope.user.num_rating.length;
      $scope.user.num_rating.push($scope.rating);
      temp += $scope.rating;
      $scope.user.rating = temp/$scope.user.num_rating.length;
      Prof.updateProfile($scope.user).success(function(args) {
        console.log(args);
      }).error(function(arg) {
        console.log(arg);
      });
    };


}]);

foodfulControllers.controller('EditProfileController', ['$scope', '$http', 'Prof', '$location', 'UserAuth', 'GeoCoder', function($scope, $http, Prof, $location, UserAuth, GeoCoder) {
  position = -1;
  document.body.style.overflow = "scroll";

  $scope.logout = function() {
    UserAuth.logout();
      $location.path('/');
  };

  Prof.getProfile().success(function(data) {
    $scope.user = data.data;
    $scope.startstate = $scope.user.state;
    $scope.states = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];
    if($scope.user.start_hour >= 12)
      $scope.startTime = 'PM';
    else {
      $scope.startTime = 'AM';
    }
    if($scope.user.end_hour >= 12)
      $scope.endTime = 'PM';
    else {
      $scope.endTime = 'AM';
    }
    $scope.update = function() {
        $scope.locstring = "";
        $scope.locstring += $scope.user.address + " ";
        $scope.locstring += $scope.user.city + " ";
        $scope.locstring += $scope.user.state + " ";
        $scope.locstring += $scope.user.zipcode;

        if ($scope.startTime == 'PM') {
            $scope.user.start_hour += 12;
        }
        if ($scope.endTime == 'PM') {
            $scope.user.end_hour += 12;
        }
        GeoCoder.geocode({address: $scope.locstring}).then(function(result) {
            $scope.user.loc = [];
            $scope.user.loc[0] = result[0].geometry.location.lng();
            $scope.user.loc[1] = result[0].geometry.location.lat();
            console.log($scope.user);
            Prof.updateProfile($scope.user).then(function(arg) {
                console.log(arg)
            }).catch(function(arg) {
                console.log(arg);
            });
        }).catch(function(arg) {
            console.log(arg);
        });
    };
  });
}]);

foodfulControllers.controller('FavoritesController', ['$scope', '$http', 'Prof', '$location', 'UserAuth', function($scope, $http, Prof, $location, UserAuth) {
  $scope.isLogged = UserAuth.currentUser
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

    $scope.logout = function() {
      UserAuth.logout();
        $location.path('/');
    };
}]);
