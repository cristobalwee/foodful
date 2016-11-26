var app = angular.module('foodful',['ngRoute', 'ngAnimate']);

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
})
