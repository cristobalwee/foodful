var app = angular.module('foodful', ['ngRoute', 'ngAnimate', 'ngMap', 'foodfulControllers', 'foodfulServices']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/landing.html',
      controller: 'LandingController'
    })

    .when('/facts', {
      templateUrl: 'partials/facts.html',
      controller: 'FactsController'
    })

    .when('/purpose', {
      templateUrl: 'partials/purpose.html',
      controller: 'PurposeController'
    })

    .when('/legal', {
      templateUrl: 'partials/legal.html',
      controller: 'LegalController'
    })

    .when('/contact', {
      templateUrl: 'partials/contact.html',
      controller: 'ContactController'
    })

    .when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'AboutController'
    })

    .when('/search', {
      templateUrl: 'partials/search.html',
      controller: 'SearchController'
    })
    
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
    })
    
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'RegisterController'
    })
})
